import {
  BadRequestException,
  Injectable,
  NotFoundException,
  OnModuleInit,
} from '@nestjs/common';
import * as path from 'path';
import { csToNetInput, faceapi } from '@faceApi/face-api.env';
import * as canvas from 'canvas';
import { InjectModel } from '@nestjs/sequelize';
import { RegistroBiometrico } from '@modules/registro-biometrico/registro-biometrico.model';
import { Trabajador } from '@modules/trabajador/trabajador.model';
import { MarcacionAsistenciaDTO } from '@modules/asistencia/asistencia.dto';
import { HorarioTrabajador } from '@modules/horario-trabajador/horario-trabajador.model';
import { TurnoTrabajo } from '@modules/turno-trabajo/turno-trabajo.model';
import { HorarioTrabajadorItem } from '@modules/horario-trabajador-item/horario-trabajador-item.model';
import { BloqueHoras } from '@modules/bloque-horas/bloque-horas.model';
import { Op } from 'sequelize';
import { ContratoTrabajador } from '@modules/contrato-trabajador/contrato-trabajador.model';
import { Asistencia } from '@modules/asistencia/asistencia.model';
import { getNextOrderValue } from '@common/utils/auto-increment.helper';
import { Sede } from '@modules/sede/sede.model';
import { Dispositivo } from '@modules/dispositivo/dispositivo.model';
import { AsignacionSedeUsuario } from '@modules/asignacion-sede-usuario/asignacion-sede-usuario.model';
import { AsistenciaUsuario } from '@modules/asistencia-usuario/asistencia-usuario.model';
import { Usuario } from '@modules/usuario/usuario.model';

@Injectable()
export class FaceService implements OnModuleInit {
  constructor(
    @InjectModel(RegistroBiometrico)
    private readonly modelRegistro: typeof RegistroBiometrico,
    @InjectModel(Asistencia)
    private readonly modelAsistencia: typeof Asistencia,
    @InjectModel(AsistenciaUsuario)
    private readonly modelAsistenciaUsuario: typeof AsistenciaUsuario,
    @InjectModel(Usuario)
    private readonly modelUsuario: typeof Usuario,
  ) {}

  private baseModelPath: string = path.join(process.cwd(), 'models');

  async onModuleInit() {
    await faceapi.nets.ssdMobilenetv1.loadFromDisk(
      path.join(this.baseModelPath, 'ssd_mobilenetv1'),
    );
    await faceapi.nets.faceLandmark68Net.loadFromDisk(
      path.join(this.baseModelPath, 'face_landmark_68'),
    );
    await faceapi.nets.faceRecognitionNet.loadFromDisk(
      path.join(this.baseModelPath, 'face_recognition'),
    );
  }

  async getDescriptorFromFile(filePath: string): Promise<Float32Array | null> {
    const img = await canvas.loadImage(filePath);
    const result = await faceapi
      .detectSingleFace(csToNetInput(img))
      .withFaceLandmarks()
      .withFaceDescriptor();

    return result?.descriptor ?? null;
  }

  async getDescriptorFromBuffer(
    imageBuffer: Buffer,
  ): Promise<Float32Array | null> {
    try {
      const img = await canvas.loadImage(imageBuffer);
      const result = await faceapi
        .detectSingleFace(csToNetInput(img))
        .withFaceLandmarks()
        .withFaceDescriptor();

      return result?.descriptor ?? null;
    } catch (error) {
      console.error('Error al obtener el descriptor desde el buffer:', error);
      return null;
    }
  }

  async compareWithReference(
    identificacion: string,
    dto: MarcacionAsistenciaDTO,
    imageBuffer: Buffer,
    fileName: string,
  ): Promise<any> {
    const fechaAsistencia = new Date(dto.fecha);

    const bio = await this.modelRegistro.findOne({
      attributes: ['id', 'archivoNombre', 'descriptor', 'codigo'],
      include: [
        {
          model: Trabajador,
          include: [
            {
              model: ContratoTrabajador,
              where: {
                isActive: true,
                fechaInicio: {
                  [Op.lte]: fechaAsistencia.toISOString().split('T')[0],
                },
              },
              order: [['orden', 'DESC']],
              required: false,
            },
            {
              model: HorarioTrabajador,
              include: [
                {
                  model: TurnoTrabajo,
                },
                {
                  model: HorarioTrabajadorItem,
                  include: [
                    {
                      model: BloqueHoras,
                    },
                    {
                      model: Sede,
                      include: [
                        {
                          model: Dispositivo,
                        },
                      ],
                    },
                  ],
                  required: true,
                },
              ],
              required: false,
            },
          ],
          where: { identificacion },
        },
      ],
    });

    if (
      !bio ||
      !bio.get().trabajador ||
      !bio.get().trabajador.get().contratos ||
      !bio.get().trabajador.get().contratos[0]
    ) {
      throw new NotFoundException(
        'Trabajador no encontrado o sin contrato activo',
      );
    }

    if (!bio || !bio.get()?.archivoNombre) {
      if (!dto.codigo) {
        throw new NotFoundException(
          'Registro biometrico no encontrado y no se proporcionó un código de registro',
        );
      }
      if (dto.codigo !== bio.get()?.codigo) {
        throw new NotFoundException(
          'El código de registro proporcionado es incorrecto',
        );
      }
    }

    const t: Trabajador = bio.get().trabajador.get();

    const horario: HorarioTrabajador = t.horarios[0]?.get();

    if (!horario || !horario.items || horario.items.length === 0) {
      throw new NotFoundException('El trabajador no tiene un horario asignado');
    }

    const fechaBloque = new Date(dto.fecha);

    const diaSemana =
      fechaAsistencia.getDay() === 0 ? 7 : fechaAsistencia.getDay();

    const horarioItemHoy: HorarioTrabajadorItem = horario.items
      .map((h) => h.get())
      .find((h: HorarioTrabajadorItem) => {
        return h?.numDia === diaSemana;
      });

    const horarioItemActual: HorarioTrabajadorItem = horario.items
      .map((h) => h.get())
      .find((h: HorarioTrabajadorItem) => {
        return dto.tipo === 'entrada'
          ? h?.numDia === diaSemana
          : h?.numDiaSalida === diaSemana;
      });

    const fechaHoy = new Date(dto.fecha);
    fechaHoy.setHours(0, 0, 0, 0);

    const asistenciaHoy = await this.modelAsistencia.findOne({
      where: {
        idTrabajador: t.id,
        idDispositivo: dto.idDispositivo,
        fecha: fechaHoy,
      },
    });

    const horarioItem = asistenciaHoy ? horarioItemHoy : horarioItemActual;

    if (!horarioItem && !asistenciaHoy) {
      throw new BadRequestException(
        'No tiene un horario asignado para este día de la semana.',
      );
    }

    const dispositivo = horarioItem.sede
      .get()
      .dispositivos.map((d: Dispositivo) => d.get())
      .find((d) => d.id === dto.idDispositivo);

    if (!dispositivo) {
      throw new BadRequestException(
        'No tiene un horario asignado para este día de la semana en este edificio.',
      );
    }

    const fecha = new Date(fechaHoy);
    fecha.setDate(
      dto.tipo === 'salida' && diaSemana != horarioItem?.numDia
        ? fecha.getDate() - 1
        : fecha.getDate(),
    );

    const asistenciaActual = await this.modelAsistencia.findOne({
      where: { idTrabajador: t.id, idDispositivo: dto.idDispositivo, fecha },
    });

    const asistencia = asistenciaHoy ? asistenciaHoy : asistenciaActual;

    if (asistencia) {
      if (dto.tipo === 'entrada' && asistencia.get().marcacionEntrada) {
        throw new BadRequestException(
          'Ya se registró la marcación de entrada para esta fecha',
        );
      } else if (dto.tipo === 'salida' && asistencia.get().marcacionSalida) {
        throw new BadRequestException(
          'Ya se registró la marcación de salida para esta fecha',
        );
      }
    } else {
      if (dto.tipo === 'salida') {
        throw new BadRequestException(
          'No se encontró ningún registró de marcación de entrada para esta fecha',
        );
      }
    }

    const hora =
      dto.tipo === 'entrada'
        ? (horarioItem?.bloque?.get()?.horaEntrada ?? 0)
        : (horarioItem?.bloque?.get()?.horaSalida ?? 0);
    const minuto =
      dto.tipo === 'entrada'
        ? (horarioItem?.bloque?.get()?.minutoEntrada ?? 0)
        : (horarioItem?.bloque?.get()?.minutoSalida ?? 0);

    fechaBloque.setHours(hora, minuto, 0, 0);

    if (dto.codigo) {
      if (imageBuffer) {
        let descriptor: Float32Array | null =
          await this.getDescriptorFromBuffer(imageBuffer);
        if (!descriptor) {
          throw new BadRequestException('No se detectó un rostro en la imagen');
        }
        const archivo = Buffer.from(imageBuffer);
        await bio.update({
          archivo,
          archivoNombre: fileName,
          descriptor: Array.from(descriptor),
          codigo: null,
        });

        const orden = await getNextOrderValue(this.modelAsistencia);
        await this.modelAsistencia.create({
          idDispositivo: dto.idDispositivo,
          idTrabajador: t.id,
          idHorarioTrabajador: horario.id,
          idHorarioTrabajadorItem: horarioItem?.id,
          fecha: fecha,
          marcacionEntrada: dto.tipo === 'entrada' ? fechaAsistencia : null,
          diferenciaEntrada: horarioItem?.bloque
            ? dto.tipo === 'entrada'
              ? (fechaAsistencia.getTime() - fechaBloque.getTime()) / 1000
              : 0
            : 0,
          orden,
          latitudEntrada: dto.latitud,
          longitudEntrada: dto.longitud,
        });
        return {
          message: `Hola ${t.nombre} ${t.apellido}, se marcó correctamente tu ${dto.tipo}`,
          distance: 0,
        };
      }
    } else {
      const descriptorReferencia = new Float32Array(bio.get().descriptor);
      const descriptorSubida = await this.getDescriptorFromBuffer(imageBuffer);

      if (!descriptorReferencia) {
        throw new NotFoundException(
          'No se encontró el descriptor de referencia',
        );
      }

      if (!descriptorSubida) {
        throw new NotFoundException('No se encontró la cara en la imagen');
      }

      const distance = faceapi.euclideanDistance(
        descriptorReferencia,
        descriptorSubida,
      );

      if (distance < 0.6) {
        const orden = await getNextOrderValue(this.modelAsistencia);
        if (dto.tipo == 'entrada') {
          await this.modelAsistencia.create({
            idDispositivo: dto.idDispositivo,
            idTrabajador: t.id,
            idHorarioTrabajador: horario.id,
            idHorarioTrabajadorItem: horarioItem?.id,
            fecha: fecha,
            marcacionEntrada: dto.tipo === 'entrada' ? fechaAsistencia : null,
            diferenciaEntrada: horarioItem?.bloque
              ? dto.tipo === 'entrada'
                ? (fechaAsistencia.getTime() - fechaBloque.getTime()) / 1000
                : 0
              : 0,
            orden,
            latitudEntrada: dto.latitud,
            longitudEntrada: dto.longitud,
          });
        } else {
          await asistencia?.update({
            marcacionSalida: dto.tipo === 'salida' ? fechaAsistencia : null,
            diferenciaSalida: horarioItem?.bloque
              ? dto.tipo === 'salida'
                ? (fechaAsistencia.getTime() - fechaBloque.getTime()) / 1000
                : 0
              : 0,
            latitudSalida: dto.latitud,
            longitudSalida: dto.longitud,
          });
        }
        return {
          message: `Hola ${t.nombre} ${t.apellido}, se marcó correctamente tu ${dto.tipo}`,
          distance,
        };
      }
      throw new NotFoundException('El rostro no coincide con el registro');
    }
  }

  async compareWithReferenceUsuario(
    identificacion: string,
    dto: MarcacionAsistenciaDTO,
    imageBuffer: Buffer,
    fileName: string,
  ): Promise<any> {
    const fechaAsistencia = new Date(dto.fecha);

    const usuario = await this.modelUsuario.findOne({
      attributes: {
        exclude: ['archivo'],
      },
      include: [
        {
          model: Sede,
          through: { attributes: [] },
          where: {
            isActive: true,
          },
          include: [
            {
              model: Sede,
              include: [
                {
                  model: Dispositivo,
                },
              ],
            },
          ],
        },
      ],
    });

    if (!usuario) {
      throw new NotFoundException('Usuario no encontrado');
    }

    if (!usuario?.get()?.archivoNombre) {
      throw new NotFoundException('Registro biometrico no encontrado');
    }

    // const dispositivo = usuario
    //   ?.get()
    //   ?.asignacionSedes.flatMap((a) => a.get().sede.get().dispositivos)
    //   .find((d) => d.id === dto.idDispositivo);

    // if (!dispositivo) {
    //   throw new BadRequestException(
    //     'No tiene un horario asignado para este día de la semana en este edificio.',
    //   );
    // }

    const fecha = new Date(dto.fecha);
    fecha.setHours(0, 0, 0, 0);

    const asistencia = await this.modelAsistenciaUsuario.findOne({
      where: {
        idUsuario: usuario.id,
        fecha,
        idDispositivo: dto.idDispositivo,
        marcacionSalida: null,
      },
    });

    if (asistencia) {
      if (dto.tipo === 'entrada' && asistencia.get().marcacionEntrada) {
        throw new BadRequestException(
          'Ya se registró la marcación de entrada para esta fecha',
        );
      } else if (dto.tipo === 'salida' && asistencia.get().marcacionSalida) {
        throw new BadRequestException(
          'Ya se registró la marcación de salida para esta fecha',
        );
      }
    } else {
      if (dto.tipo === 'salida') {
        throw new BadRequestException(
          'No se encontró ningún registró de marcación de entrada para esta fecha',
        );
      }
    }

    const descriptorReferencia = new Float32Array(usuario.get().descriptor);
    const descriptorSubida = await this.getDescriptorFromBuffer(imageBuffer);

    if (!descriptorReferencia) {
      throw new NotFoundException('No se encontró el descriptor de referencia');
    }

    if (!descriptorSubida) {
      throw new NotFoundException('No se encontró la cara en la imagen');
    }

    const distance = faceapi.euclideanDistance(
      descriptorReferencia,
      descriptorSubida,
    );

    if (distance < 0.6) {
      const orden = await getNextOrderValue(this.modelAsistenciaUsuario);
      if (dto.tipo == 'entrada') {
        await this.modelAsistenciaUsuario.create({
          idDispositivo: dto.idDispositivo,
          idUsuario: usuario?.get()?.id,
          fecha: fecha,
          marcacionEntrada: dto.tipo === 'entrada' ? fechaAsistencia : null,
          orden,
          latitudEntrada: dto.latitud,
          longitudEntrada: dto.longitud,
        });
      } else {
        await asistencia?.update({
          marcacionSalida: dto.tipo === 'salida' ? fechaAsistencia : null,
          latitudSalida: dto.latitud,
          longitudSalida: dto.longitud,
        });
      }
      return {
        message: `Hola ${usuario?.get()?.nombre} ${usuario?.get()?.apellido}, se marcó correctamente tu ${dto.tipo}`,
        distance,
      };
    }
    throw new NotFoundException('El rostro no coincide con el usuario');
  }
}

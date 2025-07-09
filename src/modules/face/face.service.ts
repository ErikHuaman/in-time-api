import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
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
import { AsistenciaUsuario } from '@modules/asistencia-usuario/asistencia-usuario.model';
import { Usuario } from '@modules/usuario/usuario.model';
import { Readable } from 'stream';
import { firstValueFrom } from 'rxjs';
import { HttpService } from '@nestjs/axios';
import FormData from 'form-data';
import { envs } from 'config/env';
import { euclideanDistance } from '@common/utils/face-api.helper';

@Injectable()
export class FaceService {
  constructor(
    private readonly httpService: HttpService,
    @InjectModel(RegistroBiometrico)
    private readonly modelRegistro: typeof RegistroBiometrico,
    @InjectModel(Asistencia)
    private readonly modelAsistencia: typeof Asistencia,
    @InjectModel(AsistenciaUsuario)
    private readonly modelAsistenciaUsuario: typeof AsistenciaUsuario,
    @InjectModel(Usuario)
    private readonly modelUsuario: typeof Usuario,
  ) {}

  async getDescriptorFromBuffer(
    imageBuffer: Buffer,
    filename: string,
    mimetype: string,
  ): Promise<{
    msg: string;
    descriptor: Float32Array | null;
  }> {
    const form = new FormData();

    // Convertimos el buffer en un stream legible
    const stream = Readable.from(imageBuffer);
    form.append('file', stream, {
      filename,
      contentType: mimetype,
    });

    try {
      const response = await firstValueFrom(
        this.httpService.post(
          `${envs.SERVER_DOMAIN}/descriptor/from-buffer`,
          form,
          {
            headers: form.getHeaders(),
          },
        ),
      );

      const descriptor = response.data?.descriptor;
      return {
        msg: response.data?.message,
        descriptor: descriptor ? new Float32Array(descriptor) : null,
      };
    } catch (error) {
      console.error(
        'Error al obtener descriptor desde la imagen:',
        error?.message || error,
      );
      return {
        msg: `Error al obtener descriptor desde la imagen: ${error?.message || error}`,
        descriptor: null,
      };
    }
    // try {
    //   const img = await canvas.loadImage(imageBuffer);
    //   const result = await faceapi
    //     .detectSingleFace(csToNetInput(img))
    //     .withFaceLandmarks()
    //     .withFaceDescriptor();

    //   return {
    //     msg: `Rostro encontrado`,
    //     descriptor: result?.descriptor ?? null,
    //   };
    // } catch (error) {
    //   console.error('Error al obtener el descriptor desde el buffer:', error);
    //   return {
    //     msg: `Error al obtener descriptor desde la imagen: ${error?.message || error}`,
    //     descriptor: null,
    //   };
    // }
  }

  async compareWithReference(
    identificacion: string,
    dto: MarcacionAsistenciaDTO,
    imageBuffer: Buffer,
    fileName: string,
    mimetype: string,
  ): Promise<any> {
    const resFace = await this.getDescriptorFromBuffer(
      imageBuffer,
      fileName,
      mimetype,
    );

    if (!resFace.descriptor) {
      throw new BadRequestException(resFace.msg);
    }

    const descriptorSubida = resFace.descriptor;

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
              where: { isActive: true },
              include: [
                {
                  model: TurnoTrabajo,
                },
                {
                  model: HorarioTrabajadorItem,
                  where: { isActive: true },
                  required: true,
                  include: [
                    {
                      model: BloqueHoras,
                      where: { isActive: true },
                      required: false,
                    },
                    {
                      model: Sede,
                      where: { isActive: true },
                      include: [
                        {
                          model: Dispositivo,
                          where: { isActive: true },
                          required: false,
                        },
                      ],
                      required: false,
                    },
                  ],
                },
              ],
              required: true,
            },
          ],
          where: { identificacion },
        },
      ],
      logging: console.log, // <-- Esto imprime el SQL generado por Sequelize
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

    console.log(
      'horarioItem.sede',
      horarioItem.sede.get().dispositivos.map((d: Dispositivo) => d.get()),
    );

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
        const archivo = Buffer.from(imageBuffer);
        await bio.update({
          archivo,
          archivoNombre: fileName,
          mimetype,
          descriptor: Array.from(descriptorSubida),
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

      const distance = euclideanDistance(
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
    mimetype: string,
  ): Promise<any> {
    const resFace = await this.getDescriptorFromBuffer(
      imageBuffer,
      fileName,
      mimetype,
    );

    if (!resFace.descriptor) {
      throw new BadRequestException(resFace.msg);
    }

    const descriptorSubida = resFace.descriptor;

    const fechaAsistencia = new Date(dto.fecha);

    console.log('fechaAsistencia', fechaAsistencia);

    const result = await this.modelUsuario.findOne({
      attributes: {
        include: ['descriptor'],
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
              model: Dispositivo,
            },
          ],
        },
      ],
    });

    if (!result) {
      throw new NotFoundException('Usuario no encontrado');
    }

    const usuario = result?.toJSON();

    if (!usuario?.archivoNombre) {
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

    if (!usuario.descriptor) {
      throw new NotFoundException('No se encontró el descriptor de referencia');
    }

    const descriptorReferencia = new Float32Array(usuario.descriptor);

    if (!descriptorReferencia) {
      throw new NotFoundException('No se encontró el descriptor de referencia');
    }

    const distance = euclideanDistance(descriptorReferencia, descriptorSubida);

    if (distance < 0.6) {
      const orden = await getNextOrderValue(this.modelAsistenciaUsuario);
      if (dto.tipo == 'entrada') {
        await this.modelAsistenciaUsuario.create({
          idDispositivo: dto.idDispositivo,
          idUsuario: usuario?.id,
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
        message: `Hola ${usuario?.nombre} ${usuario?.apellido}, se marcó correctamente tu ${dto.tipo}`,
        distance,
      };
    }
    throw new NotFoundException('El rostro no coincide con el usuario');
  }
}

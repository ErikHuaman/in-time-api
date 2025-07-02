import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { Trabajador } from './trabajador.model';
import { TrabajadorDTO } from './trabajador.dto';
import { Sede } from '@modules/sede/sede.model';
import { Cargo } from '@modules/cargo/cargo.model';
import { TiempoContrato } from '@modules/tiempo-contrato/tiempo-contrato.model';
import { ContratoTrabajador } from '@modules/contrato-trabajador/contrato-trabajador.model';
import { ContactoTrabajador } from '@modules/contacto-trabajador/contacto-trabajador.model';
import { InfoTrabajador } from '@modules/info-trabajador/info-trabajador.model';
import { BeneficioTrabajador } from '@modules/beneficio-trabajador/beneficio-trabajador.model';
import { ControlTrabajador } from '@modules/control-trabajador/control-trabajador.model';
import { Ciudad } from '@modules/localizacion/ciudad/ciudad.model';
import { Provincia } from '@modules/localizacion/provincia/provincia.model';
import { InactivacionTrabajador } from '@modules/inactivacion-trabajador/inactivacion-trabajador.model';
import { Dispositivo } from '@modules/dispositivo/dispositivo.model';
import { HorarioTrabajador } from '@modules/horario-trabajador/horario-trabajador.model';
import { HorarioTrabajadorItem } from '@modules/horario-trabajador-item/horario-trabajador-item.model';
import { BloqueHoras } from '@modules/bloque-horas/bloque-horas.model';
import { col, fn, Op, where } from 'sequelize';
import { Asistencia } from '@modules/asistencia/asistencia.model';
import { TurnoTrabajo } from '@modules/turno-trabajo/turno-trabajo.model';
import { RegistroBiometrico } from '@modules/registro-biometrico/registro-biometrico.model';
import { Vacacion } from '@modules/vacacion/vacacion.model';
import { PermisoTrabajador } from '@modules/permiso-trabajador/permiso-trabajador.model';
import { JustificacionInasistencia } from '@modules/justificacion-inasistencia/justificacion-inasistencia.model';
import { CorreccionMarcacion } from '@modules/correccion-marcacion/correccion-marcacion.model';
import { Adelanto } from '@modules/adelanto/adelanto.model';
import { Usuario } from '@modules/usuario/usuario.model';
import { TrabajadorRepository } from './trabajador.repository';
import { PaginatedResponse } from '@common/interfaces/paginated-response.interface';
import { ContratoTrabajadorRepository } from '@modules/contrato-trabajador/contrato-trabajador.repository';
import { ControlTrabajadorRepository } from '@modules/control-trabajador/control-trabajador.repository';
import { InfoTrabajadorRepository } from '@modules/info-trabajador/info-trabajador.repository';
import { ContactoTrabajadorRepository } from '@modules/contacto-trabajador/contacto-trabajador.repository';
import { BeneficioTrabajadorRepository } from '@modules/beneficio-trabajador/beneficio-trabajador.repository';
import { AsignacionSedeRepository } from '@modules/asignacion-sede/asignacion-sede.repository';
import { RegistroBiometricoRepository } from '@modules/registro-biometrico/registro-biometrico.repository';
import { getDiasDelMes } from '@common/utils/fecha.function';
import { SeguroSalud } from '@modules/seguro-salud/seguro-salud.model';
import { FondoPensiones } from '@modules/fondo-pensiones/fondo-pensiones.model';

@Injectable()
export class TrabajadorService {
  constructor(
    private readonly repository: TrabajadorRepository,
    private readonly contratoRepository: ContratoTrabajadorRepository,
    private readonly controlRepository: ControlTrabajadorRepository,
    private readonly biometricoRepository: RegistroBiometricoRepository,
    private readonly infoRepository: InfoTrabajadorRepository,
    private readonly contactoRepository: ContactoTrabajadorRepository,
    private readonly beneficioRepository: BeneficioTrabajadorRepository,
    private readonly asignacionRepository: AsignacionSedeRepository,
  ) {}

  // async findAll(idUsuario: string, codigo: string): Promise<Trabajador[]> {
  //   let whereCondition: any = { isActive: true };
  //   if (codigo === 'super' || codigo === 'admin') {
  //     whereCondition = { isActive: true };
  //   } else {
  //     whereCondition = {
  //       isActive: true,
  //       idUsuario,
  //     };
  //   }
  //   return this.repository.findAll({
  //     include: [
  //       {
  //         model: ContratoTrabajador,
  //         where: { isActive: true },
  //         include: [
  //           {
  //             model: Cargo,
  //             required: false,
  //           },
  //           {
  //             model: TiempoContrato,
  //             required: false,
  //           },
  //         ],
  //         required: false,
  //       },
  //       {
  //         model: Sede,
  //         through: { attributes: [] },
  //         where: { isActive: true },
  //         include: [
  //           {
  //             model: Sede,
  //             required: false,
  //             include: [
  //               {
  //                 model: Sede,
  //                 through: { attributes: [] },
  //                 where: whereCondition,
  //                 required: false,
  //               },
  //             ],
  //           },
  //         ],
  //         required: false,
  //       },
  //       { model: ControlTrabajador },
  //     ],
  //   });
  // }

  async findAll(
    user: Usuario,
    limit: number,
    offset: number,
    filter?: boolean,
    search?: string,
    isAsigned: boolean = false
  ): Promise<PaginatedResponse<Trabajador>> {
    const searchTerm = (search || '').toLowerCase();
    let whereCondition: any = { isActive: true };
    if (['super', 'admin'].includes(user?.rol?.codigo)) {
      whereCondition = { isActive: true };
    } else {
      whereCondition = {
        isActive: true,
        id: user?.id,
      };
    }
    return this.repository.findAndCountAll({
      where: {
        isActive: true,
        [Op.or]: [
          where(fn('LOWER', col('Trabajador.nombre')), {
            [Op.like]: `%${searchTerm}%`,
          }),
          where(fn('LOWER', col('Trabajador.apellido')), {
            [Op.like]: `%${searchTerm}%`,
          }),
          where(fn('LOWER', col('Trabajador.identificacion')), {
            [Op.like]: `%${searchTerm}%`,
          }),
        ],
      },
      include: [
        {
          model: ContratoTrabajador,
          where: { isActive: true },
          include: [
            {
              model: Cargo,
              where: { isActive: true },
              required: false,
            },
            {
              model: TiempoContrato,
              required: false,
            },
          ],
          required: false,
        },
        {
          model: Sede,
          through: { attributes: [] },
          where: { isActive: true },
          required: isAsigned,
        },
        { model: ControlTrabajador, where: { isActive: true } },
      ],
      order: [
        ['orden', 'DESC'],
        [{ model: ContratoTrabajador, as: 'contratos' }, 'orden', 'DESC'],
        [{ model: Sede, as: 'sedes' }, 'orden', 'DESC'],
      ],
      limit,
      offset,
    });
  }

  async findAllInactives(
    user: Usuario,
    limit: number,
    offset: number,
    filter?: boolean,
    search?: string,
  ): Promise<PaginatedResponse<Trabajador>> {
    const searchTerm = (search || '').toLowerCase();
    return this.repository.findAndCountAll({
      where: {
        isActive: false,
        ...(searchTerm && {
          [Op.or]: [
            where(fn('LOWER', col('Trabajador.nombre')), {
              [Op.like]: `%${searchTerm}%`,
            }),
            where(fn('LOWER', col('Trabajador.apellido')), {
              [Op.like]: `%${searchTerm}%`,
            }),
            where(fn('LOWER', col('Trabajador.identificacion')), {
              [Op.like]: `%${searchTerm}%`,
            }),
          ],
        }),
      },
      include: [
        {
          model: InactivacionTrabajador,
          where: { isActive: true },
          separate: true,
          limit: 1,
          required: false,
        },
      ],
      limit,
      offset,
      // order: [
      //   [
      //     { model: InactivacionTrabajador, as: 'inactivaciones' },
      //     'orden',
      //     'DESC',
      //   ],
      // ],
    });
  }

  async findOne(id: string): Promise<Trabajador | null> {
    return this.repository.findOne({
      where: { id },
      include: [
        {
          model: ContratoTrabajador,
          where: { isActive: true },
          required: false,
        },
        {
          model: RegistroBiometrico,
          where: { isActive: true },
          attributes: {
            exclude: ['archivo', 'descriptor'],
          },
          required: false,
        },
        {
          model: ContactoTrabajador,
          where: { isActive: true },
          required: false,
        },
        {
          model: InfoTrabajador,
          where: { isActive: true },
          include: [
            {
              model: Ciudad,
              include: [
                {
                  model: Provincia,
                },
              ],
            },
          ],
          required: false,
        },
        {
          model: BeneficioTrabajador,
          where: { isActive: true },
          required: false,
        },
        {
          model: ControlTrabajador,
          where: { isActive: true },
          required: false,
        },
        {
          model: Sede,
          through: { attributes: ['fechaAsignacion'] },
          where: { isActive: true },
          required: false,
        },
        {
          model: InactivacionTrabajador,
          where: { isActive: true },
          separate: true,
          limit: 1,
          required: false,
        },
      ],
    });
  }

  async create(
    dto: Partial<Trabajador>,
    archivo?: Buffer<ArrayBufferLike>,
    archivoNombre?: string,
    descriptor?: number[],
  ): Promise<Trabajador | null> {
    try {
      const {
        contratos,
        controles,
        biometricos,
        infos,
        contactos,
        beneficios,
        sedes,
      } = dto;
      const orden = await this.repository.getNextOrderValue();
      const ordenContrato = await this.contratoRepository.getNextOrderValue();
      const ordenControl = await this.controlRepository.getNextOrderValue();
      const ordenBiometrico =
        await this.biometricoRepository.getNextOrderValue();
      const ordenInfo = await this.infoRepository.getNextOrderValue();
      const ordenContacto = await this.contactoRepository.getNextOrderValue();
      const ordenBeneficio = await this.beneficioRepository.getNextOrderValue();

      const trabajador = await this.repository.create(
        {
          ...dto,
          orden,
          contratos: (contratos ?? [{}]).map(
            (contrato) =>
              ({
                ...contrato,
                orden: ordenContrato,
              }) as ContratoTrabajador,
          ),
          controles: (controles ?? [{}]).map(
            (control) =>
              ({
                ...control,
                orden: ordenControl,
              }) as ControlTrabajador,
          ),
          biometricos: (biometricos ?? [{}]).map(
            (biometrico) =>
              ({
                ...biometrico,
                archivo,
                archivoNombre,
                descriptor,
                orden: ordenBiometrico,
              }) as RegistroBiometrico,
          ),
          infos: (infos ?? [{}]).map(
            (info) =>
              ({
                ...info,
                orden: ordenInfo,
              }) as InfoTrabajador,
          ),
          contactos: (contactos ?? [{}]).map(
            (contacto) =>
              ({
                ...contacto,
                orden: ordenContacto,
              }) as ContactoTrabajador,
          ),
          beneficios: (beneficios ?? [{}]).map(
            (beneficio) =>
              ({
                ...beneficio,
                orden: ordenBeneficio,
              }) as BeneficioTrabajador,
          ),
        },
        {
          include: [
            {
              model: ContratoTrabajador,
            },
            {
              model: ControlTrabajador,
            },
            {
              model: RegistroBiometrico,
            },
            {
              model: InfoTrabajador,
            },
            {
              model: ContactoTrabajador,
            },
            {
              model: BeneficioTrabajador,
            },
          ],
        },
      );

      if (sedes && sedes?.length) {
        for (const sede of sedes) {
          await this.asignacionRepository.create({
            idTrabajador: trabajador.id,
            idSede: sede.id,
            fechaAsignacion: (sede as any).AsignacionSede.fechaAsignacion,
          });
        }
      }
      return trabajador;
    } catch (error) {
      if (error.name === 'SequelizeUniqueConstraintError') {
        throw new BadRequestException('Ya existe un registro con ese valor');
      }
      throw new InternalServerErrorException('Error interno');
    }
  }

  async createMany(list: Partial<Trabajador>[]): Promise<Trabajador[]> {
    const orden = await this.repository.getNextOrderValue();
    const ordenContrato = await this.contratoRepository.getNextOrderValue();
    const ordenControl = await this.controlRepository.getNextOrderValue();
    const ordenBiometrico = await this.biometricoRepository.getNextOrderValue();
    const ordenInfo = await this.infoRepository.getNextOrderValue();
    const ordenContacto = await this.contactoRepository.getNextOrderValue();
    const ordenBeneficio = await this.beneficioRepository.getNextOrderValue();
    return Promise.all(
      list.map(async (dto, i) => {
        const trabajador = await this.repository.create(
          {
            ...dto,
            orden: orden + i,
            contratos: dto.contratos?.map(
              (contrato) =>
                ({
                  ...contrato,
                  orden: ordenContrato + i,
                }) as ContratoTrabajador,
            ),
            controles: dto.controles?.map(
              (control) =>
                ({
                  ...control,
                  orden: ordenControl + i,
                }) as ControlTrabajador,
            ),
            biometricos: dto.biometricos?.map(
              (biometrico) =>
                ({
                  ...biometrico,
                  orden: ordenBiometrico + i,
                }) as RegistroBiometrico,
            ),
            infos: dto.infos?.map(
              (info) =>
                ({
                  ...info,
                  orden: ordenInfo + i,
                }) as InfoTrabajador,
            ),
            contactos: dto.contactos?.map(
              (contacto) =>
                ({
                  ...contacto,
                  orden: ordenContacto + i,
                }) as ContactoTrabajador,
            ),
            beneficios: dto.beneficios?.map(
              (beneficio) =>
                ({
                  ...beneficio,
                  orden: ordenBeneficio + i,
                }) as BeneficioTrabajador,
            ),
          },
          {
            include: [
              {
                model: ContratoTrabajador,
              },
              {
                model: ControlTrabajador,
              },
              {
                model: RegistroBiometrico,
              },
              {
                model: InfoTrabajador,
              },
              {
                model: ContactoTrabajador,
              },
              {
                model: BeneficioTrabajador,
              },
            ],
          },
        );
        // 2. Luego asignar las sedes
        if (dto.sedes?.length) {
          for (const sede of dto.sedes) {
            await this.asignacionRepository.create({
              idTrabajador: trabajador.id,
              idSede: sede.id,
              fechaAsignacion: (sede as any).AsignacionSede.fechaAsignacion,
            });
          }
        }
        return trabajador;
      }),
    );
  }

  async update(
    id: string,
    dto: Partial<Trabajador>,
    archivo?: Buffer<ArrayBufferLike>,
    archivoNombre?: string,
    descriptor?: number[],
  ): Promise<[number, Trabajador[]]> {
    try {
      const {
        contratos,
        controles,
        biometricos,
        infos,
        contactos,
        beneficios,
        sedes,
        ...trabajador
      } = dto;
      if (contratos) {
        for (const item of contratos!) {
          await this.contratoRepository.update(item.id, item);
        }
      }
      if (controles) {
        for (const item of controles!) {
          await this.controlRepository.update(item.id, item);
        }
      }
      if (biometricos) {
        for (const item of biometricos!) {
          await this.biometricoRepository.update(item.id, {
            ...item,
            archivo,
            archivoNombre,
            descriptor,
          });
        }
      }
      if (infos) {
        for (const item of infos!) {
          await this.infoRepository.update(item.id, item);
        }
      }
      if (contactos) {
        for (const item of contactos!) {
          await this.contactoRepository.update(item.id, item);
        }
      }
      if (beneficios) {
        for (const item of beneficios!) {
          await this.beneficioRepository.update(item.id, item);
        }
      }

      if (sedes && sedes?.length) {
        const securedDtoList = await Promise.all(
          sedes.map((sede, i) => ({
            idTrabajador: id,
            idSede: sede.id,
            fechaAsignacion: (sede as any).AsignacionSede.fechaAsignacion,
          })),
        );

        await this.asignacionRepository.bulkDestroy({
          where: {
            idTrabajador: id,
            idSede: {
              [Op.notIn]: sedes.map((dto) => dto.id),
            },
          },
        });

        await this.asignacionRepository.bulkCreate(
          securedDtoList,
          {
            updateOnDuplicate: ['fechaAsignacion'],
            individualHooks: true,
            ignoreDuplicates: true,
          },
          {
            where: {
              idTrabajador: id,
              idSede: {
                [Op.in]: sedes.map((dto) => dto.id),
              },
            },
          },
        );
      }

      return this.repository.update(id, trabajador);
    } catch (error) {
      console.error(error);
      if (error.name === 'SequelizeUniqueConstraintError') {
        throw new BadRequestException('Ya existe un registro con ese valor');
      }
      throw new InternalServerErrorException('Error interno');
    }
  }

  async changeStatus(
    id: string,
    isActive: boolean,
  ): Promise<[number, Trabajador[]]> {
    return this.repository.update(id, { isActive });
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }

  async restore(id: string): Promise<void> {
    await this.repository.restore(id);
  }

  async obtenerArchivo(idBiometrico: string) {
    const result = await this.biometricoRepository.findOne({
      scopes: ['withArchivo'],
      where: { id: idBiometrico },
    });
    if (!result) {
      throw new BadRequestException('No se encontró el registro');
    }
    const data = result.toJSON();
    return {
      id: data.id,
      fileName: data.archivoNombre,
      file: data.archivo,
    };
  }

  async findByDNIAndDate(dni: string, date: Date): Promise<Trabajador | null> {
    const fecha = new Date(date);
    const dia = fecha.getDay();
    return this.repository.findOne({
      where: {
        identificacion: '999999999',
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
              as: 'dispositivos',
            },
          ],
        },
        {
          model: HorarioTrabajador,
          as: 'horarios',
          include: [
            {
              model: HorarioTrabajadorItem,
              as: 'items',
              where: { numDia: dia },
              include: [
                {
                  model: BloqueHoras,
                  as: 'bloque',
                },
              ],
            },
          ],
        },
      ],
    });
  }

  async findAllByMonth(date: Date, idUsuario: string): Promise<Trabajador[]> {
    const fecha = new Date(date);
    // Primer día del mes
    const primerDia = new Date(fecha.getFullYear(), fecha.getMonth(), 1);

    // Último día del mes
    const ultimoDia = new Date(fecha.getFullYear(), fecha.getMonth() + 1, 0);

    return this.repository.findAll({
      include: [
        {
          model: ContratoTrabajador,
          where: {
            isActive: true,
            fechaInicio: {
              [Op.lte]: primerDia.toISOString().split('T')[0],
            },
          },
          include: [
            {
              model: Cargo,
            },
          ],
          required: true,
        },
        {
          model: Sede,
          through: { attributes: [] },
          required: true,
          include: [
            {
              model: Usuario,
              through: { attributes: [] },
              attributes: {
                exclude: ['archivo', 'descriptor'],
              },
              where: {
                isActive: true,
                id: idUsuario,
              },
              required: true,
            },
          ],
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
                  model: JustificacionInasistencia,
                  attributes: {
                    exclude: ['archivo'],
                  },
                  where: { isActive: true },
                  required: false,
                },
                {
                  model: Sede,
                },
              ],
            },
          ],
          required: true,
        },
        {
          model: Asistencia,
          where: {
            fecha: {
              [Op.between]: [
                primerDia.toISOString().split('T')[0],
                ultimoDia.toISOString().split('T')[0],
              ],
            },
          },
          include: [
            {
              model: CorreccionMarcacion,
              required: false,
            },
          ],
          required: false,
        },
        {
          model: Vacacion,
          where: {
            [Op.or]: [
              {
                fechaInicio: {
                  [Op.between]: [
                    primerDia.toISOString().split('T')[0],
                    ultimoDia.toISOString().split('T')[0],
                  ],
                },
              },
              {
                fechaFin: {
                  [Op.between]: [
                    primerDia.toISOString().split('T')[0],
                    ultimoDia.toISOString().split('T')[0],
                  ],
                },
              },
              {
                [Op.and]: [
                  {
                    fechaInicio: {
                      [Op.lte]: primerDia.toISOString().split('T')[0],
                    },
                  },
                  {
                    fechaFin: {
                      [Op.gte]: ultimoDia.toISOString().split('T')[0],
                    },
                  },
                ],
              },
            ],
          },
          required: false,
        },
        {
          model: PermisoTrabajador,
          where: {
            [Op.or]: [
              {
                fechaInicio: {
                  [Op.between]: [
                    primerDia.toISOString().split('T')[0],
                    ultimoDia.toISOString().split('T')[0],
                  ],
                },
              },
              {
                fechaFin: {
                  [Op.between]: [
                    primerDia.toISOString().split('T')[0],
                    ultimoDia.toISOString().split('T')[0],
                  ],
                },
              },
              {
                [Op.and]: [
                  {
                    fechaInicio: {
                      [Op.lte]: primerDia.toISOString().split('T')[0],
                    },
                  },
                  {
                    fechaFin: {
                      [Op.gte]: ultimoDia.toISOString().split('T')[0],
                    },
                  },
                ],
              },
            ],
          },
          required: false,
        },
      ],
    });
  }

  async findAllByMonthPlanilla(date: Date): Promise<Trabajador[]> {
    const fecha = new Date(date);
    // Primer día del mes
    const primerDia = new Date(fecha.getFullYear(), fecha.getMonth(), 1);

    // Último día del mes
    const ultimoDia = new Date(fecha.getFullYear(), fecha.getMonth() + 1, 0);

    return this.repository.findAll({
      include: [
        {
          model: ContratoTrabajador,
          where: {
            isActive: true,
            fechaInicio: {
              [Op.lte]: primerDia.toISOString().split('T')[0],
            },
          },
          include: [
            {
              model: Cargo,
              where: {
                isEditable: true,
              },
            },
          ],
          required: true,
        },
        {
          model: Sede,
          through: { attributes: [] },
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
              ],
            },
          ],
          required: true,
        },
        {
          model: Asistencia,
          where: {
            fecha: {
              [Op.between]: [
                primerDia.toISOString().split('T')[0],
                ultimoDia.toISOString().split('T')[0],
              ],
            },
          },
          required: false,
        },
        {
          model: Vacacion,
          where: {
            [Op.or]: [
              {
                fechaInicio: {
                  [Op.between]: [
                    primerDia.toISOString().split('T')[0],
                    ultimoDia.toISOString().split('T')[0],
                  ],
                },
              },
              {
                fechaFin: {
                  [Op.between]: [
                    primerDia.toISOString().split('T')[0],
                    ultimoDia.toISOString().split('T')[0],
                  ],
                },
              },
              {
                [Op.and]: [
                  {
                    fechaInicio: {
                      [Op.lte]: primerDia.toISOString().split('T')[0],
                    },
                  },
                  {
                    fechaFin: {
                      [Op.gte]: ultimoDia.toISOString().split('T')[0],
                    },
                  },
                ],
              },
            ],
          },
          required: false,
        },
        {
          model: PermisoTrabajador,
          where: {
            [Op.or]: [
              {
                fechaInicio: {
                  [Op.between]: [
                    primerDia.toISOString().split('T')[0],
                    ultimoDia.toISOString().split('T')[0],
                  ],
                },
              },
              {
                fechaFin: {
                  [Op.between]: [
                    primerDia.toISOString().split('T')[0],
                    ultimoDia.toISOString().split('T')[0],
                  ],
                },
              },
              {
                [Op.and]: [
                  {
                    fechaInicio: {
                      [Op.lte]: primerDia.toISOString().split('T')[0],
                    },
                  },
                  {
                    fechaFin: {
                      [Op.gte]: ultimoDia.toISOString().split('T')[0],
                    },
                  },
                ],
              },
            ],
          },
          required: false,
        },
        {
          model: Adelanto,
          where: {
            fechaDescuento: {
              [Op.between]: [
                primerDia.toISOString().split('T')[0],
                ultimoDia.toISOString().split('T')[0],
              ],
            },
          },
          required: false,
        },
      ],
    });
  }

  async findAllByMonthDescanseros(date: Date): Promise<Trabajador[]> {
    const fecha = new Date(date);
    // Primer día del mes
    const primerDia = new Date(fecha.getFullYear(), fecha.getMonth(), 1);

    // Último día del mes
    const ultimoDia = new Date(fecha.getFullYear(), fecha.getMonth() + 1, 0);

    return this.repository.findAll({
      include: [
        {
          model: ContratoTrabajador,
          where: {
            isActive: true,
            fechaInicio: {
              [Op.lte]: primerDia.toISOString().split('T')[0],
            },
          },
          include: [
            {
              model: Cargo,
              where: {
                isEditable: false,
                isDescansero: true,
              },
            },
          ],
          required: true,
        },
        {
          model: Sede,
          through: { attributes: [] },
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
              ],
            },
          ],
          required: true,
        },
        {
          model: Asistencia,
          where: {
            fecha: {
              [Op.between]: [
                primerDia.toISOString().split('T')[0],
                ultimoDia.toISOString().split('T')[0],
              ],
            },
          },
          required: false,
        },
        {
          model: Vacacion,
          where: {
            [Op.or]: [
              {
                fechaInicio: {
                  [Op.between]: [
                    primerDia.toISOString().split('T')[0],
                    ultimoDia.toISOString().split('T')[0],
                  ],
                },
              },
              {
                fechaFin: {
                  [Op.between]: [
                    primerDia.toISOString().split('T')[0],
                    ultimoDia.toISOString().split('T')[0],
                  ],
                },
              },
              {
                [Op.and]: [
                  {
                    fechaInicio: {
                      [Op.lte]: primerDia.toISOString().split('T')[0],
                    },
                  },
                  {
                    fechaFin: {
                      [Op.gte]: ultimoDia.toISOString().split('T')[0],
                    },
                  },
                ],
              },
            ],
          },
          required: false,
        },
        {
          model: PermisoTrabajador,
          where: {
            [Op.or]: [
              {
                fechaInicio: {
                  [Op.between]: [
                    primerDia.toISOString().split('T')[0],
                    ultimoDia.toISOString().split('T')[0],
                  ],
                },
              },
              {
                fechaFin: {
                  [Op.between]: [
                    primerDia.toISOString().split('T')[0],
                    ultimoDia.toISOString().split('T')[0],
                  ],
                },
              },
              {
                [Op.and]: [
                  {
                    fechaInicio: {
                      [Op.lte]: primerDia.toISOString().split('T')[0],
                    },
                  },
                  {
                    fechaFin: {
                      [Op.gte]: ultimoDia.toISOString().split('T')[0],
                    },
                  },
                ],
              },
            ],
          },
          required: false,
        },
      ],
    });
  }

  async findAllByMonthReemplazos(date: Date): Promise<Trabajador[]> {
    const fecha = new Date(date);
    // Primer día del mes
    const primerDia = new Date(fecha.getFullYear(), fecha.getMonth(), 1);

    // Último día del mes
    const ultimoDia = new Date(fecha.getFullYear(), fecha.getMonth() + 1, 0);

    return this.repository.findAll({
      include: [
        {
          model: ContratoTrabajador,
          where: {
            isActive: true,
            fechaInicio: {
              [Op.lte]: primerDia.toISOString().split('T')[0],
            },
          },
          include: [
            {
              model: Cargo,
              where: {
                isEditable: false,
                isDescansero: false,
              },
            },
          ],
          required: true,
        },
        {
          model: Sede,
          through: { attributes: [] },
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
              ],
            },
          ],
          required: true,
        },
        {
          model: Asistencia,
          where: {
            fecha: {
              [Op.between]: [
                primerDia.toISOString().split('T')[0],
                ultimoDia.toISOString().split('T')[0],
              ],
            },
          },
          required: false,
        },
        {
          model: Vacacion,
          where: {
            [Op.or]: [
              {
                fechaInicio: {
                  [Op.between]: [
                    primerDia.toISOString().split('T')[0],
                    ultimoDia.toISOString().split('T')[0],
                  ],
                },
              },
              {
                fechaFin: {
                  [Op.between]: [
                    primerDia.toISOString().split('T')[0],
                    ultimoDia.toISOString().split('T')[0],
                  ],
                },
              },
              {
                [Op.and]: [
                  {
                    fechaInicio: {
                      [Op.lte]: primerDia.toISOString().split('T')[0],
                    },
                  },
                  {
                    fechaFin: {
                      [Op.gte]: ultimoDia.toISOString().split('T')[0],
                    },
                  },
                ],
              },
            ],
          },
          required: false,
        },
        {
          model: PermisoTrabajador,
          where: {
            [Op.or]: [
              {
                fechaInicio: {
                  [Op.between]: [
                    primerDia.toISOString().split('T')[0],
                    ultimoDia.toISOString().split('T')[0],
                  ],
                },
              },
              {
                fechaFin: {
                  [Op.between]: [
                    primerDia.toISOString().split('T')[0],
                    ultimoDia.toISOString().split('T')[0],
                  ],
                },
              },
              {
                [Op.and]: [
                  {
                    fechaInicio: {
                      [Op.lte]: primerDia.toISOString().split('T')[0],
                    },
                  },
                  {
                    fechaFin: {
                      [Op.gte]: ultimoDia.toISOString().split('T')[0],
                    },
                  },
                ],
              },
            ],
          },
          required: false,
        },
      ],
    });
  }

  async findOneByIdAndMonth(
    id: string,
    date: Date,
  ): Promise<Trabajador | null> {
    const fecha = new Date(date);
    // Primer día del mes
    const primerDia = new Date(fecha.getFullYear(), fecha.getMonth(), 1);

    // Último día del mes
    const ultimoDia = new Date(fecha.getFullYear(), fecha.getMonth() + 1, 0);

    return this.repository.findOne({
      where: {
        id,
      },
      include: [
        {
          model: ContratoTrabajador,
          include: [
            {
              model: Cargo,
            },
          ],
        },
        {
          model: BeneficioTrabajador,
          include: [
            {
              model: SeguroSalud,
            },
            {
              model: FondoPensiones,
            },
          ],
        },
        {
          model: Sede,
          through: { attributes: [] },
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
              ],
            },
          ],
          required: true,
        },
        {
          model: Asistencia,
          where: {
            fecha: {
              [Op.between]: [
                primerDia.toISOString().split('T')[0],
                ultimoDia.toISOString().split('T')[0],
              ],
            },
          },
          required: false,
        },
        {
          model: Vacacion,
          where: {
            [Op.or]: [
              {
                fechaInicio: {
                  [Op.between]: [
                    primerDia.toISOString().split('T')[0],
                    ultimoDia.toISOString().split('T')[0],
                  ],
                },
              },
              {
                fechaFin: {
                  [Op.between]: [
                    primerDia.toISOString().split('T')[0],
                    ultimoDia.toISOString().split('T')[0],
                  ],
                },
              },
              {
                [Op.and]: [
                  {
                    fechaInicio: {
                      [Op.lte]: primerDia.toISOString().split('T')[0],
                    },
                  },
                  {
                    fechaFin: {
                      [Op.gte]: ultimoDia.toISOString().split('T')[0],
                    },
                  },
                ],
              },
            ],
          },
          required: false,
        },
        {
          model: PermisoTrabajador,
          where: {
            [Op.or]: [
              {
                fechaInicio: {
                  [Op.between]: [
                    primerDia.toISOString().split('T')[0],
                    ultimoDia.toISOString().split('T')[0],
                  ],
                },
              },
              {
                fechaFin: {
                  [Op.between]: [
                    primerDia.toISOString().split('T')[0],
                    ultimoDia.toISOString().split('T')[0],
                  ],
                },
              },
              {
                [Op.and]: [
                  {
                    fechaInicio: {
                      [Op.lte]: primerDia.toISOString().split('T')[0],
                    },
                  },
                  {
                    fechaFin: {
                      [Op.gte]: ultimoDia.toISOString().split('T')[0],
                    },
                  },
                ],
              },
            ],
          },
          required: false,
        },
        {
          model: Adelanto,
          where: {
            fechaDescuento: {
              [Op.between]: [
                primerDia.toISOString().split('T')[0],
                ultimoDia.toISOString().split('T')[0],
              ],
            },
          },
          required: false,
        },
      ],
    });
  }

  async findByDNI(identificacion: string): Promise<any | null> {
    const trabajador = await this.repository.findOne({
      where: { identificacion, isActive: true },
      include: [
        {
          model: ContratoTrabajador,
          where: { isActive: true },
          include: [
            {
              model: Cargo,
              required: false,
            },
          ],
          required: false,
        },
        {
          model: RegistroBiometrico,
          where: { isActive: true },
          required: true,
        },
      ],
    });
    if (trabajador) {
      return {
        identificacion: identificacion,
        nombres: `${trabajador?.get()?.nombre} ${trabajador?.get()?.apellido}`,
        cargo: trabajador?.get()?.contratos[0]?.get()?.cargo?.get()?.nombre,
        tieneRegistro: !!trabajador?.get()?.biometricos[0]?.get()
          ?.archivoNombre,
        esTrabajador: true,
      };
    }
    return null;
  }

  async getComprobantePago(id: string, date: Date): Promise<any> {
    const codigos = {
      1: 'D',
      2: 'N',
      3: 'A',
    };
    const trabajador = await this.findOneByIdAndMonth(id, date);

    if (trabajador) {
      const t = trabajador.toJSON();
      const horario = t.horarios[0];
      const now = new Date();
      const vacacion = t.vacaciones[0];
      const permiso = t.permisos;
      const diasMes = getDiasDelMes(date);
      let asistido = 0;
      const marcaciones = diasMes.map((d) => {
        const asist = (t.asistencias ?? []).find((a) => {
          const fecha = new Date(a.fecha);
          return (
            d.fecha.toISOString().split('T')[0] ===
            fecha.toISOString().split('T')[0]
          );
        });

        let diaLibre = false;

        let diaDescanso = false;

        let diario;

        let totalHorario = 0;
        let totalAsistencia = 0;

        if (horario) {
          const item: HorarioTrabajadorItem = horario.items
            .map((h: HorarioTrabajadorItem) => h)
            .find((h: HorarioTrabajadorItem) => h.numDia === d.diaSemana);

          diaLibre = d.fecha.getTime() > now.getTime() || item.diaLibre;

          diaDescanso = !diaLibre && item.diaDescanso;

          const noBloque = item?.bloque ? true : false;

          const horaEntrada = item.bloque?.horaEntrada ?? 0;
          const minutoEntrada = item.bloque?.minutoEntrada ?? 0;

          const entrada = new Date(d.fecha);
          entrada.setHours(horaEntrada, minutoEntrada);

          const horaSalida = item.bloque?.horaSalida ?? 0;
          const minutoSalida = item.bloque?.minutoSalida ?? 0;

          const salida = new Date(d.fecha);
          salida.setDate(
            horaSalida < horaEntrada ? salida.getDate() + 1 : salida.getDate(),
          );
          salida.setHours(horaSalida, minutoSalida);

          const marcacionEntrada = asist
            ? new Date(asist?.marcacionEntrada)
            : null;
          const marcacionSalida = asist
            ? new Date(asist?.marcacionSalida)
            : null;

          diario = {
            codigo: !diaLibre
              ? item?.diaDescanso
                ? 'X'
                : codigos[horario.turno?.orden]
              : '-',
            horario: {
              diaLibre,
              diaDescanso,
              entrada: noBloque ? entrada : null,
              salida: noBloque ? salida : null,
            },
            asistencia: {
              diaLibre,
              diaDescanso,
              marcacionEntrada,
              marcacionSalida,
            },
          };

          const diffMsHor =
            salida && entrada ? salida.getTime() - entrada.getTime() : 0;

          totalHorario = Math.floor(diffMsHor / 1000 / 60) ?? 0;

          const diffMs =
            marcacionSalida && marcacionEntrada
              ? marcacionSalida.getTime() -
                (marcacionEntrada.getTime() < entrada.getTime()
                  ? entrada.getTime()
                  : marcacionEntrada.getTime())
              : 0;

          totalAsistencia = Math.floor(diffMs / 1000 / 60);

          const horaTotal = Math.floor(totalAsistencia / 60);
          const minutoTotal = totalAsistencia % 60;
          const tardanza =
            totalAsistencia !== 0 && !diaLibre
              ? (asist?.diferenciaEntrada > 0
                  ? Math.abs(asist?.diferenciaEntrada)
                  : 0) / 60
              : 0;
          const diff = totalAsistencia - totalHorario;
          const sobretiempo =
            totalAsistencia !== 0 && !diaLibre
              ? diff > 0
                ? Math.abs(diff)
                : 0
              : 0;
          const retiro =
            totalAsistencia !== 0 && !diaLibre
              ? diff < 0
                ? Math.abs(diff)
                : 0
              : 0;

          if (totalAsistencia == 0) {
            asistido++;
          } else {
            asistido = 0;
          }

          let newCodigo =
            totalAsistencia == 0 && !diaLibre
              ? diaDescanso
                ? asistido > 1
                  ? 'F'
                  : diario.codigo
                : 'F'
              : totalAsistencia != 0 &&
                  Math.abs(totalAsistencia - totalHorario) > 10
                ? diaDescanso
                  ? 'DD'
                  : 'OB'
                : diario.codigo;

          if (vacacion) {
            const vacInicio = new Date(vacacion.fechaInicio);
            vacInicio.setHours(0, 0, 0);
            const vacFin = new Date(vacacion.fechaFin);
            vacFin.setHours(23, 59, 59);
            const fechaTime = new Date(d.fecha).getTime();
            if (
              vacInicio.getTime() <= fechaTime &&
              fechaTime <= vacFin.getTime()
            ) {
              newCodigo = 'V';
            }
          }

          if (permiso && newCodigo != 'V') {
            const perm = permiso.find((p) => {
              const pInicio = new Date(p.fechaInicio);
              pInicio.setHours(0, 0, 0);
              const pFin = new Date(p.fechaFin);
              pFin.setHours(23, 59, 59);
              const fechaTime = new Date(d.fecha).getTime();
              return (
                pInicio.getTime() <= fechaTime && fechaTime <= pFin.getTime()
              );
            });
            if (perm) {
              newCodigo = 'P';
            }
          }

          diario = {
            ...diario,
            tardanza: {
              hora: tardanza > 0 ? Math.floor(tardanza / 60) : 0,
              minuto: tardanza > 0 ? tardanza % 60 : 0,
            },
            sobretiempo: {
              hora: sobretiempo > 0 ? Math.floor(sobretiempo / 60) : 0,
              minuto: sobretiempo > 0 ? sobretiempo % 60 : 0,
            },
            retiro: {
              hora: retiro > 0 ? Math.floor(retiro / 60) : 0,
              minuto: retiro > 0 ? retiro % 60 : 0,
            },
            codigo: newCodigo,
            horaTotal,
            minutoTotal,
          };
        }
        return {
          dia: d.dia,
          numDia: d.diaSemana,
          fecha: d.fecha,
          ...diario,
          totalAsistencia,
          totalHorario,
        };
      });
      const {
        contratos,
        adelantos,
        beneficios,
        sedes,
        asistencias,
        horarios,
        ...x
      } = t;

      const maxCont = Math.max(...contratos.map((a) => a.orden));
      const contrato = contratos.find((a) => a.orden === maxCont);

      const maxAsign = Math.max(...sedes.map((a) => a.orden));
      const asignacion = sedes.find((a) => a.orden === maxAsign);

      const maxBenef = Math.max(...beneficios.map((a) => a.orden));
      const beneficio = beneficios.find((a) => a.orden === maxBenef);

      const cargo = contrato.cargo ? contrato.cargo : undefined;
      const sede = asignacion.sede ? asignacion.sede : undefined;

      const seguro = beneficio.seguro ? beneficio.seguro : undefined;
      const afp = beneficio.fondoPensiones
        ? beneficio.fondoPensiones
        : undefined;

      const diasLaborados = marcaciones.filter(
        (m) => !['-', 'F', 'X', 'V'].includes(m.codigo),
      ).length;
      const feriados = marcaciones.filter((m) =>
        ['AA'].includes(m.codigo),
      ).length;
      const faltas = marcaciones.filter((m) => ['F'].includes(m.codigo)).length;
      const permisos = marcaciones.filter((m) =>
        ['P'].includes(m.codigo),
      ).length;
      const descansos = marcaciones.filter((m) =>
        ['X'].includes(m.codigo),
      ).length;
      const totalDias = marcaciones.filter(
        (m) => !['-', 'V'].includes(m.codigo),
      ).length;

      const totalDiasVacaciones = marcaciones.filter((m) =>
        ['V'].includes(m.codigo),
      ).length;

      const horasDiarias = contrato.horasContrato;
      const horasSemanales =
        horario.items.filter((h) => !h.diaLibre && !h.diaDescanso).length *
        horasDiarias;
      const horasMensuales = diasLaborados * horasDiarias;
      const horasOrdinarias = horasDiarias > 8 ? 8 : horasDiarias;
      const horasExtra = horasDiarias > 8 ? horasDiarias - 8 : 0;

      const totalDiasMes = diasMes.length;

      const salarioBasico = contrato.salarioMensual;

      const salarioDiarioBase = salarioBasico / totalDiasMes;

      const salarioDiario = parseFloat(salarioDiarioBase.toFixed(2));

      const salarioHora = parseFloat((salarioDiario / 8).toFixed(2));

      const horasExtra25 = horasExtra > 2 ? horasExtra - 2 : horasExtra;

      const horasExtra35 = horasExtra - horasExtra25;

      const salarioHoraExtra25 = parseFloat((salarioHora * 1.25).toFixed(2));

      const salarioHoraExtra35 = parseFloat((salarioHora * 1.35).toFixed(2));

      const salarioHoraTotal =
        salarioHora + salarioHoraExtra25 + salarioHoraExtra35;

      const salarioDiarioExtra25 = horasExtra25 * salarioHoraExtra25;

      const salarioDiarioExtra35 = horasExtra35 * salarioHoraExtra35;

      const salarioDiarioTotal =
        salarioDiario + salarioDiarioExtra25 + salarioDiarioExtra35;

      const salarioMesExtra25 = salarioDiarioExtra25 * diasLaborados;

      const salarioMesExtra35 = salarioDiarioExtra35 * diasLaborados;

      const descuentoFaltas = parseFloat((faltas * salarioDiario).toFixed(2));

      const salarioVacaciones = parseFloat(
        (totalDiasVacaciones * salarioDiario).toFixed(2),
      );

      const salarioMensual = parseFloat(
        (salarioDiarioBase * (totalDias + totalDiasVacaciones)).toFixed(2),
      );

      const salarioFeriado = parseFloat((0).toFixed(2));

      const sis = parseFloat((15).toFixed(2));

      const sctr = parseFloat((0).toFixed(2));

      const essalud = parseFloat((0).toFixed(2));

      const salarioMensualTotal =
        salarioMensual + salarioMesExtra25 + salarioMesExtra35;

      const sueldoBruto =
        salarioMensualTotal + salarioFeriado - descuentoFaltas;

      const montoAFP = parseFloat((sueldoBruto * 0.1137).toFixed(2));

      const montoONP = parseFloat((0).toFixed(2));

      const pagoNeto = sueldoBruto - montoAFP - sis;

      let datos = {
        ruc: sedes[0]?.ruc,
        razonSocial: sedes[0].razonSocial,
        tipoDoc: t?.tipoDocID?.nombre,
        identificacion: t?.identificacion,
        nombre: t?.nombre,
        apellido: t?.apellido,
        situacion: 'activo o subsidiado',
        fechaIngreso: contrato?.fechaInicio,
        tipoTrabajador: 'empleado',
        regimenPensionario: afp?.nombre ?? 'NO APLICA',
        cuspp: '256971NPMDH0',
        diasLaborados: diasLaborados,
        diasNoLaborados: faltas,
        diasSubcidiados: 0,
        condicion: 'Domiciliado',
        totalHoras: horasOrdinarias,
        minutos: 0,
        totalHorasExtra: horasExtra25 + horasExtra35,
        minutosExtra: 0,
        suspencionTipo: '',
        suspencionMotivo: '',
        suspencionDias: '',
        quintaCategoria: 'No tiene',
      };

      let grupoDetalle = [
        {
          nombre: 'Ingresos',
          monto: '',
          items: [
            {
              codigo: '0105',
              nombre: 'TRABAJO SOBRETIEMPO (H. EXTRAS 25%)',
              ingreso: salarioMesExtra25,
              descuento: '',
              neto: '',
            },
            {
              codigo: '0106',
              nombre: 'TRABAJO SOBRETIEMPO (H. EXTRAS 35%)',
              ingreso: salarioMesExtra35,
              descuento: '',
              neto: '',
            },
            {
              codigo: '0121',
              nombre: 'REMUNERACIÓN O JORNAL BÁSICO',
              ingreso: salarioMensual,
              descuento: '',
              neto: '',
            },
          ],
        },
        {
          nombre: 'Descuentos',
          monto: '',
          items: [
            {
              codigo: '0701',
              nombre: 'ADELANTO',
              ingreso: '',
              descuento: adelantos?.reduce(
                (acc, item) => acc + item.montoAdelanto,
                0,
              ),
              neto: '',
            },
            {
              codigo: '0705',
              nombre: 'INASISTENCIAS',
              ingreso: '',
              descuento: descuentoFaltas,
              neto: '',
            },
          ],
        },
        {
          nombre: 'Aportes del Trabajador',
          monto: '',
          items: [
            {
              codigo: '0601',
              nombre: 'COMISIÓN AFP PORCENTUAL',
              ingreso: '',
              descuento: montoAFP,
              neto: '',
            },
            {
              codigo: '0605',
              nombre: 'RENTA QUINTA CATEGORÍA RETENCIONES',
              ingreso: '',
              descuento: '0.00',
              neto: '',
            },
            {
              codigo: '0606',
              nombre: 'PRIMA DE SEGURO AFP',
              ingreso: '',
              descuento: '0.00',
              neto: '',
            },
            {
              codigo: '0608',
              nombre: 'SPP - APORTACIÓN OBLIGATORIA',
              ingreso: '',
              descuento: '167.38',
              neto: '',
            },
          ],
        },
      ];

      let aportes = [
        {
          codigo: '0804',
          nombre: 'ESSALUD(REGULAR CBSSP AGRAR/AC)TRAB',
          ingreso: '',
          descuento: '',
          neto: '150.64',
        },
      ];

      return { datos, aportes, grupoDetalle, pagoNeto };

      return {
        ...x,
        cargo,
        sede,
        diasLaborados,
        feriados,
        faltas,
        permisos,
        descansos,
        totalDias,
        horasDiarias,
        horasSemanales,
        horasMensuales,
        horasOrdinarias,
        totalDiasMes,
        salarioBasico,
        salarioDiario,
        salarioHora,
        horasExtra25,
        horasExtra35,
        salarioHoraExtra25,
        salarioHoraExtra35,
        salarioHoraTotal,
        salarioDiarioExtra25,
        salarioDiarioExtra35,
        salarioDiarioTotal,
        salarioMensual,
        salarioMensualTotal,
        salarioMesExtra25,
        salarioMesExtra35,
        sueldoBruto,
        descuentoFaltas,
        totalDiasVacaciones,
        salarioVacaciones,
        salarioFeriado,
        montoAFP,
        montoONP,
        sis,
        sctr,
        essalud,
        pagoNeto,
      };
    } else {
      return null;
    }
  }
}

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
          required: false,
        },
        { model: ControlTrabajador, where: { isActive: true } },
      ],
      order: [
        ['orden', 'ASC'],
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
      where: { id, isActive: true },
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
        ...trabajador
      } = dto;
      const orden = await this.repository.getNextOrderValue();
      const ordenContrato = await this.contratoRepository.getNextOrderValue();
      const ordenControl = await this.controlRepository.getNextOrderValue();
      const ordenBiometrico =
        await this.biometricoRepository.getNextOrderValue();
      const ordenInfo = await this.infoRepository.getNextOrderValue();
      const ordenContacto = await this.contactoRepository.getNextOrderValue();
      const ordenBeneficio = await this.beneficioRepository.getNextOrderValue();
      return this.repository.create(
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

  async delete(id: string, force: boolean): Promise<void> {
    const trabajador = await this.repository.findOne({ where: { id } });
    await this.repository.delete(id);
  }

  async restore(id: string): Promise<void> {
    await this.repository.restore(id);
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
          as: 'asignacionSedes',
          where: {
            isActive: true,
          },
          include: [
            {
              model: Sede,
              as: 'sede',
              include: [
                {
                  model: Dispositivo,
                  as: 'dispositivos',
                },
              ],
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
          include: [
            {
              model: Sede,
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
          include: [
            {
              model: Sede,
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
          include: [
            {
              model: Sede,
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
          model: Sede,
          through: { attributes: [] },
          include: [
            {
              model: Sede,
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
          attributes: {
            exclude: ['archivo'],
          },
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
}

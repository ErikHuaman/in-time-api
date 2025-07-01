import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { Sede } from './sede.model';
import { Pais } from '@modules/localizacion/pais/pais.model';
import { Region } from '@modules/localizacion/region/region.model';
import { Provincia } from '@modules/localizacion/provincia/provincia.model';
import { Ciudad } from '@modules/localizacion/ciudad/ciudad.model';
import { SedeDTO } from './sede.dto';
import { Dispositivo } from '@modules/dispositivo/dispositivo.model';
import { Trabajador } from '@modules/trabajador/trabajador.model';
import { ContactoTrabajador } from '@modules/contacto-trabajador/contacto-trabajador.model';
import { InfoTrabajador } from '@modules/info-trabajador/info-trabajador.model';
import { ContratoTrabajador } from '@modules/contrato-trabajador/contrato-trabajador.model';
import { Cargo } from '@modules/cargo/cargo.model';
import { HorarioTrabajador } from '@modules/horario-trabajador/horario-trabajador.model';
import { TurnoTrabajo } from '@modules/turno-trabajo/turno-trabajo.model';
import { HorarioTrabajadorItem } from '@modules/horario-trabajador-item/horario-trabajador-item.model';
import { BloqueHoras } from '@modules/bloque-horas/bloque-horas.model';
import { JustificacionInasistencia } from '@modules/justificacion-inasistencia/justificacion-inasistencia.model';
import { Asistencia } from '@modules/asistencia/asistencia.model';
import { CorreccionMarcacion } from '@modules/correccion-marcacion/correccion-marcacion.model';
import { Vacacion } from '@modules/vacacion/vacacion.model';
import { PermisoTrabajador } from '@modules/permiso-trabajador/permiso-trabajador.model';
import { col, fn, Op, where } from 'sequelize';
import { Usuario } from '@modules/usuario/usuario.model';
import { SedeRepository } from './sede.repository';
import { PaginatedResponse } from '@common/interfaces/paginated-response.interface';

@Injectable()
export class SedeService {
  constructor(private readonly repository: SedeRepository) {}

  async findAll(
    user: Usuario,
    limit: number,
    offset: number,
    filter?: boolean,
    search?: string,
  ): Promise<PaginatedResponse<Sede>> {
    const searchTerm = (search || '').toLowerCase();
    let whereCondition: any = { isActive: true };
    let asignacionRequired = false;
    if (['super', 'admin'].includes(user?.rol?.codigo)) {
      whereCondition = { isActive: true };
    } else if (!filter) {
      whereCondition = { isActive: true };
    } else {
      asignacionRequired = true;
      whereCondition = {
        isActive: true,
        id: user?.id,
      };
    }
    return this.repository.findAndCountAll({
      where: {
        ...(searchTerm && {
          [Op.or]: [
            where(fn('LOWER', col('Sede.nombre')), {
              [Op.like]: `%${searchTerm}%`,
            }),
            where(fn('LOWER', col('Sede.razonSocial')), {
              [Op.like]: `%${searchTerm}%`,
            }),
            where(fn('LOWER', col('Sede.ruc')), {
              [Op.like]: `%${searchTerm}%`,
            }),
            where(fn('LOWER', col('Sede.direccion')), {
              [Op.like]: `%${searchTerm}%`,
            }),
          ],
        }),
      },
      include: [
        {
          model: Usuario,
          through: { attributes: [] },
          where: whereCondition,
          required: asignacionRequired,
        },
        {
          model: Dispositivo,
          where: { isActive: true },
          required: false,
        },
      ],
      limit,
      offset,
      order: [['orden', 'DESC']],
    });
  }

  async findOne(id: string): Promise<Sede | null> {
    return this.repository.findOne({
      where: { id },
      include: [
        {
          model: Ciudad,
          required: true,
          attributes: {
            exclude: ['createdAt', 'updatedAt'],
          },
          include: [
            {
              model: Provincia,
              required: true,
              attributes: {
                exclude: ['createdAt', 'updatedAt'],
              },
              include: [
                {
                  model: Region,
                  required: true,
                  attributes: {
                    exclude: ['createdAt', 'updatedAt'],
                  },
                  include: [
                    {
                      model: Pais,
                      required: true,
                      attributes: {
                        exclude: ['createdAt', 'updatedAt'],
                      },
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    });
  }

  async create(dto: SedeDTO): Promise<Sede | null> {
    try {
      const orden = await this.repository.getNextOrderValue();
      return this.repository.create({ ...dto, orden });
    } catch (error) {
      if (error.name === 'SequelizeUniqueConstraintError') {
        throw new BadRequestException('Ya existe un registro con ese valor');
      }
      throw new InternalServerErrorException('Error interno');
    }
  }

  async createMany(dtoList: Partial<Sede>[]): Promise<Sede[]> {
    const orden = await this.repository.getNextOrderValue();
    return this.repository.bulkCreate(
      dtoList.map((item, i) => ({ ...item, orden: orden + i })),
      {
        individualHooks: true,
        ignoreDuplicates: true,
      },
    );
  }

  async update(id: string, dto: SedeDTO): Promise<[number, Sede[]]> {
    try {
      return this.repository.update(id, dto);
    } catch (error) {
      if (error.name === 'SequelizeUniqueConstraintError') {
        throw new BadRequestException('Ya existe un registro con ese valor');
      }
      throw new InternalServerErrorException('Error interno');
    }
  }

  async changeStatus(id: string, isActive: boolean): Promise<[number, Sede[]]> {
    return this.repository.update(id, { isActive });
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }

  async restore(id: string): Promise<void> {
    await this.repository.restore(id);
  }

  findByFecha(date: Date): Promise<Sede[]> {
    const fecha = new Date(date);
    const dia = fecha.getDay();
    return this.repository.findAll({
      include: [
        {
          model: Usuario,
          through: { attributes: [] },
          attributes: {
            exclude: ['password', 'archivo', 'archivoNombre', 'descriptor'],
          },
          where: { isActive: true },
        },
        {
          model: Trabajador,
          through: { attributes: [] },
          where: { isActive: true },
          include: [
            {
              model: ContactoTrabajador,
              where: { isActive: true },
            },
            {
              model: InfoTrabajador,
              where: { isActive: true },
            },
            {
              model: ContratoTrabajador,
              where: {
                isActive: true,
                fechaInicio: {
                  [Op.lte]: fecha.toISOString().split('T')[0],
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
              model: HorarioTrabajador,
              include: [
                {
                  model: TurnoTrabajo,
                },
                {
                  model: HorarioTrabajadorItem,
                  where: { numDia: dia },
                  include: [
                    {
                      model: Sede,
                    },
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
                  required: true
                },
              ],
              required: true,
            },
            {
              model: Asistencia,
              where: {
                fecha: {
                  [Op.eq]: fecha.toISOString().split('T')[0],
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
                [Op.and]: [
                  {
                    fechaInicio: {
                      [Op.lte]: fecha.toISOString().split('T')[0],
                    },
                  },
                  {
                    fechaFin: {
                      [Op.gte]: fecha.toISOString().split('T')[0],
                    },
                  },
                ],
              },
              required: false,
            },
            {
              model: PermisoTrabajador,
              where: {
                [Op.and]: [
                  {
                    fechaInicio: {
                      [Op.lte]: fecha.toISOString().split('T')[0],
                    },
                  },
                  {
                    fechaFin: {
                      [Op.gte]: fecha.toISOString().split('T')[0],
                    },
                  },
                ],
              },
              required: false,
            },
          ],
        },
      ],
    });
  }
}

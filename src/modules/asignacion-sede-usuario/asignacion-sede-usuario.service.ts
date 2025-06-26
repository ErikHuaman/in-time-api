import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { getNextOrderValue } from '@common/utils/auto-increment.helper';
import { AsignacionSedeUsuario } from './asignacion-sede-usuario.model';
import { Sede } from '@modules/sede/sede.model';
import { AsignacionSede } from '@modules/asignacion-sede/asignacion-sede.model';
import { Trabajador } from '@modules/trabajador/trabajador.model';
import { ContratoTrabajador } from '@modules/contrato-trabajador/contrato-trabajador.model';
import { Op } from 'sequelize';
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
import { ContactoTrabajador } from '@modules/contacto-trabajador/contacto-trabajador.model';
import { InfoTrabajador } from '@modules/info-trabajador/info-trabajador.model';
import { AsignacionSedeUsuarioRepository } from './asignacion-sede-usuario.repository';
import { PaginatedResponse } from '@common/interfaces/paginated-response.interface';

@Injectable()
export class AsignacionSedeUsuarioService {
  constructor(private readonly repository: AsignacionSedeUsuarioRepository) {}

  async findAll(): Promise<PaginatedResponse<AsignacionSedeUsuario>> {
    return this.repository.findAndCountAll();
  }

  async findOne(id: string): Promise<AsignacionSedeUsuario | null> {
    return this.repository.findOne({ where: { id } });
  }

  async findAllByUsuario(idUsuario: string): Promise<AsignacionSedeUsuario[]> {
    return this.repository.findAll({
      where: { idUsuario },
      order: [['orden', 'ASC']],
      include: [
        {
          model: Sede,
        },
      ],
    });
  }

  async create(
    dto: Partial<AsignacionSedeUsuario>,
  ): Promise<AsignacionSedeUsuario | null> {
    try {
      return this.repository.create({ ...dto });
    } catch (error) {
      if (error.name === 'SequelizeUniqueConstraintError') {
        throw new BadRequestException('Ya existe un registro con ese valor');
      }
      throw new InternalServerErrorException('Error interno');
    }
  }

  async createMany(
    dtoList: Partial<AsignacionSedeUsuario>[],
  ): Promise<AsignacionSedeUsuario[]> {
    return this.repository.bulkCreate(
      dtoList.map((item, i) => ({ ...item })),
      {
        individualHooks: true,
        ignoreDuplicates: true,
      },
    );
  }

  async update(
    id: string,
    dto: Partial<AsignacionSedeUsuario>,
  ): Promise<[number, AsignacionSedeUsuario[]]> {
    try {
      return this.repository.update(id, dto);
    } catch (error) {
      if (error.name === 'SequelizeUniqueConstraintError') {
        throw new BadRequestException('Ya existe un registro con ese valor');
      }
      throw new InternalServerErrorException('Error interno');
    }
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }

  async restore(id: string): Promise<void> {
    await this.repository.restore(id);
  }

  findByIdUsuarioAndFecha(
    date: Date,
    idUsuario: string,
  ): Promise<AsignacionSedeUsuario[]> {
    const fecha = new Date(date);
    return this.repository.findAll({
      where: { idUsuario },
      order: [['orden', 'ASC']],
      include: [
        {
          model: Sede,
          include: [
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
        },
      ],
    });
  }
}

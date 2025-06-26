import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { getNextOrderValue } from '@common/utils/auto-increment.helper';
import { HorarioTrabajador } from './horario-trabajador.model';
import { HorarioTrabajadorDTO } from './horario-trabajador.dto';
import { Trabajador } from '@modules/trabajador/trabajador.model';
import { ContratoTrabajador } from '@modules/contrato-trabajador/contrato-trabajador.model';
import { Cargo } from '@modules/cargo/cargo.model';
import { Sede } from '@modules/sede/sede.model';
import { HorarioTrabajadorItem } from '@modules/horario-trabajador-item/horario-trabajador-item.model';
import { BloqueHoras } from '@modules/bloque-horas/bloque-horas.model';
import { Usuario } from '@modules/usuario/usuario.model';
import { PaginatedResponse } from '@common/interfaces/paginated-response.interface';
import { HorarioTrabajadorRepository } from './horario-trabajador.repository';

@Injectable()
export class HorarioTrabajadorService {
  constructor(private readonly repository: HorarioTrabajadorRepository) {}

  async findAll(
    user: Usuario,
    limit: number,
    offset: number,
    filter?: boolean,
    search?: string,
  ): Promise<PaginatedResponse<HorarioTrabajador>> {
    const searchTerm = (search || '').toLowerCase();
    return this.repository.findAndCountAll({
      include: [
        {
          model: Trabajador,
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
              model: Sede,
              through: { attributes: [] },
              required: false,
            },
          ],
          required: true,
        },
        {
          model: HorarioTrabajadorItem,
          include: [
            {
              model: BloqueHoras,
            },
            {
              model: Sede,
            },
          ],
          required: true,
        },
      ],
      limit,
      offset,
      order: [['orden', 'ASC']],
    });
  }

  async findOne(id: string): Promise<HorarioTrabajador | null> {
    return this.repository.findOne({
      where: { id },
    });
  }

  async create(dto: HorarioTrabajadorDTO): Promise<HorarioTrabajador | null> {
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

  async update(
    id: string,
    dto: HorarioTrabajadorDTO,
  ): Promise<[number, HorarioTrabajador[]]> {
    try {
      return this.repository.update(id, dto);
    } catch (error) {
      if (error.name === 'SequelizeUniqueConstraintError') {
        throw new BadRequestException('Ya existe un registro con ese valor');
      }
      throw new InternalServerErrorException('Error interno');
    }
  }

  async changeStatus(
    id: string,
    isActive: boolean,
  ): Promise<[number, HorarioTrabajador[]]> {
    return this.repository.update(id, { isActive });
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }

  async restore(id: string): Promise<void> {
    await this.repository.restore(id);
  }
}

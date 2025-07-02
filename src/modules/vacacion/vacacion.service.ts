import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { getNextOrderValue } from '@common/utils/auto-increment.helper';
import { Vacacion } from './vacacion.model';
import { Cargo } from '@modules/cargo/cargo.model';
import { Sede } from '@modules/sede/sede.model';
import { Trabajador } from '@modules/trabajador/trabajador.model';
import { VacacionDTO } from './vacacion.dto';
import { VacacionRepository } from './vacacion.repository';
import { PaginatedResponse } from '@common/interfaces/paginated-response.interface';
import { Usuario } from '@modules/usuario/usuario.model';
import { col, fn, Op, where } from 'sequelize';

@Injectable()
export class VacacionService {
  constructor(private readonly repository: VacacionRepository) {}

  async findAll(
    user: Usuario,
    limit: number,
    offset: number,
    filter?: boolean,
    search?: string,
  ): Promise<PaginatedResponse<Vacacion>> {
    const searchTerm = (search || '').toLowerCase();
    return this.repository.findAndCountAll({
      include: [
        {
          model: Sede,
          required: true,
        },
        {
          model: Cargo,
          required: true,
        },
        {
          model: Trabajador,
          where: {
            ...(searchTerm && {
              [Op.or]: [
                where(fn('LOWER', col('Trabajador.nombre')), {
                  [Op.like]: `%${searchTerm}%`,
                }),
              ],
            }),
          },
          required: true,
        },
      ],
      limit,
      offset,
      order: [['orden', 'DESC']],
    });
  }

  async findOne(id: string): Promise<Vacacion | null> {
    return this.repository.findOne({
      where: { id },
    });
  }

  async create(dto: VacacionDTO): Promise<Vacacion | null> {
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

  async update(id: string, dto: VacacionDTO): Promise<[number, Vacacion[]]> {
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
  ): Promise<[number, Vacacion[]]> {
    return this.repository.update(id, { isActive });
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }

  async restore(id: string): Promise<void> {
    await this.repository.restore(id);
  }
}

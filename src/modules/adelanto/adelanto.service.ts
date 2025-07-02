import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { getNextOrderValue } from '@common/utils/auto-increment.helper';
import { Adelanto } from './adelanto.model';
import { AdelantoDTO } from './adelanto.dto';
import { Trabajador } from '@modules/trabajador/trabajador.model';
import { Sede } from '@modules/sede/sede.model';
import { Cargo } from '@modules/cargo/cargo.model';
import { AdelantoRepository } from './adelanto.repository';
import { PaginatedResponse } from '@common/interfaces/paginated-response.interface';
import { Usuario } from '@modules/usuario/usuario.model';

@Injectable()
export class AdelantoService {
  constructor(private readonly repository: AdelantoRepository) {}

  async findAll(
    user: Usuario,
    limit: number,
    offset: number,
    filter?: boolean,
    search?: string,
  ): Promise<PaginatedResponse<Adelanto>> {
    const searchTerm = (search || '').toLowerCase();
    return this.repository.findAndCountAll({
      limit,
      offset,
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
          required: true,
        },
      ],
      order: [['orden', 'DESC']],
    });
  }

  async findOne(id: string): Promise<Adelanto | null> {
    return this.repository.findOne({
      where: { id },
    });
  }

  async create(dto: AdelantoDTO): Promise<Adelanto | null> {
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

  async update(id: string, dto: AdelantoDTO): Promise<[number, Adelanto[]]> {
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
  ): Promise<[number, Adelanto[]]> {
    return this.repository.update(id, { isActive });
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }

  async restore(id: string): Promise<void> {
    await this.repository.restore(id);
  }
}

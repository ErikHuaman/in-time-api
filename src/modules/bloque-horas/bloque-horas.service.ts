import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { getNextOrderValue } from '@common/utils/auto-increment.helper';
import { BloqueHoras } from './bloque-horas.model';
import { BloqueHorasDTO } from './bloque-horas.dto';
import { Usuario } from '@modules/usuario/usuario.model';
import { BloqueHorasRepository } from './bloque-horas.repository';
import { PaginatedResponse } from '@common/interfaces/paginated-response.interface';

@Injectable()
export class BloqueHorasService {
  constructor(private readonly repository: BloqueHorasRepository) {}

  async findAll(
    user: Usuario,
    limit: number,
    offset: number,
    filter?: boolean,
    search?: string,
  ): Promise<PaginatedResponse<BloqueHoras>> {
    const searchTerm = (search || '').toLowerCase();
    return this.repository.findAndCountAll({
      limit,
      offset,
      order: [['orden', 'ASC']],
    });
  }

  async findOne(id: string): Promise<BloqueHoras | null> {
    return this.repository.findOne({
      where: { id },
    });
  }

  async create(dto: BloqueHorasDTO): Promise<BloqueHoras | null> {
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
    dto: BloqueHorasDTO,
  ): Promise<[number, BloqueHoras[]]> {
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
  ): Promise<[number, BloqueHoras[]]> {
    return this.repository.update(id, { isActive });
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }

  async restore(id: string): Promise<void> {
    await this.repository.restore(id);
  }
}

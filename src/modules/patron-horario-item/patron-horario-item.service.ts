import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { getNextOrderValue } from '@common/utils/auto-increment.helper';
import { PatronHorarioItem } from './patron-horario-item.model';
import { PatronHorarioItemDTO } from './patron-horario-item.dto';
import { PatronHorarioItemRepository } from './patron-horario-item.repository';
import { Usuario } from '@modules/usuario/usuario.model';
import { PaginatedResponse } from '@common/interfaces/paginated-response.interface';

@Injectable()
export class PatronHorarioItemService {
  constructor(private readonly repository: PatronHorarioItemRepository) {}

  async findAll(
    user: Usuario,
    limit: number,
    offset: number,
    filter?: boolean,
    search?: string,
  ): Promise<PaginatedResponse<PatronHorarioItem>> {
    const searchTerm = (search || '').toLowerCase();
    return this.repository.findAndCountAll({
      limit,
      offset,
    });
  }

  async findOne(id: string): Promise<PatronHorarioItem | null> {
    return this.repository.findOne({
      where: { id },
    });
  }

  async create(dto: PatronHorarioItemDTO): Promise<PatronHorarioItem | null> {
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
    dto: PatronHorarioItemDTO,
  ): Promise<[number, PatronHorarioItem[]]> {
    try {
      return this.repository.update(id, dto);
    } catch (error) {
      if (error.name === 'SequelizeUniqueConstraintError') {
        throw new BadRequestException('Ya existe un registro con ese valor');
      }
      throw new InternalServerErrorException('Error interno');
    }
  }

  async createMany(
    dtoList: Partial<PatronHorarioItem>[],
  ): Promise<PatronHorarioItem[]> {
    const orden = await this.repository.getNextOrderValue();
    return this.repository.bulkCreate(
      dtoList.map((item, i) => ({ ...item, orden: orden + i })),
      {
        individualHooks: true,
        ignoreDuplicates: true,
      },
    );
  }

  async changeStatus(
    id: string,
    isActive: boolean,
  ): Promise<[number, PatronHorarioItem[]]> {
    return this.repository.update(id, { isActive });
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }

  async restore(id: string): Promise<void> {
    await this.repository.restore(id);
  }
}

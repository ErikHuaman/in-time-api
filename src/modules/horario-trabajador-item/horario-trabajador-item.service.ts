import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { getNextOrderValue } from '@common/utils/auto-increment.helper';
import { HorarioTrabajadorItem } from './horario-trabajador-item.model';
import { HorarioTrabajadorItemDTO } from './horario-trabajador-item.dto';
import { HorarioTrabajadorItemRepository } from './horario-trabajador-item.repository';
import { Usuario } from '@modules/usuario/usuario.model';
import { PaginatedResponse } from '@common/interfaces/paginated-response.interface';

@Injectable()
export class HorarioTrabajadorItemService {
  constructor(private readonly repository: HorarioTrabajadorItemRepository) {}

  async findAll(
    user: Usuario,
    limit: number,
    offset: number,
    filter?: boolean,
    search?: string,
  ): Promise<PaginatedResponse<HorarioTrabajadorItem>> {
    const searchTerm = (search || '').toLowerCase();
    return this.repository.findAndCountAll({
      limit,
      offset,
      order: [['orden', 'ASC']],
    });
  }

  async findOne(id: string): Promise<HorarioTrabajadorItem | null> {
    return this.repository.findOne({
      where: { id },
    });
  }

  async create(
    dto: HorarioTrabajadorItemDTO,
  ): Promise<HorarioTrabajadorItem | null> {
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

  async createMany(
    dtoList: Partial<HorarioTrabajadorItem>[],
  ): Promise<HorarioTrabajadorItem[]> {
    const orden = await this.repository.getNextOrderValue();
    return this.repository.bulkCreate(
      dtoList.map((item, i) => {
        return { ...item, orden: orden + i };
      }),
      {
        individualHooks: true,
        ignoreDuplicates: true,
      },
    );
  }

  async update(
    id: string,
    dto: HorarioTrabajadorItemDTO,
  ): Promise<[number, HorarioTrabajadorItem[]]> {
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
  ): Promise<[number, HorarioTrabajadorItem[]]> {
    return this.repository.update(id, { isActive });
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }

  async restore(id: string): Promise<void> {
    await this.repository.restore(id);
  }
}

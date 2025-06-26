import { getNextOrderValue } from '@common/utils/auto-increment.helper';
import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { SeguroSalud } from './seguro-salud.model';
import { PaginatedResponse } from '@common/interfaces/paginated-response.interface';
import { SeguroSaludRepository } from './seguro-salud.repository';

@Injectable()
export class SeguroSaludService {
  constructor(private readonly repository: SeguroSaludRepository) {}

  async findAll(): Promise<PaginatedResponse<SeguroSalud>> {
    return this.repository.findAndCountAll({
      order: [['orden', 'ASC']],
    });
  }

  async create(dto: Partial<SeguroSalud>): Promise<SeguroSalud | null> {
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
    dto: Partial<SeguroSalud>,
  ): Promise<[number, SeguroSalud[]]> {
    try {
      return this.repository.update(id, dto);
    } catch (error) {
      if (error.name === 'SequelizeUniqueConstraintError') {
        throw new BadRequestException('Ya existe un registro con ese valor');
      }
      throw new InternalServerErrorException('Error interno');
    }
  }

  async updateMany(dtoList: Partial<SeguroSalud>[]): Promise<boolean> {
    await Promise.all(
      dtoList.map((item) =>
        this.repository.update(item.id!, { valor: item.valor }),
      ),
    );
    return true;
  }
}

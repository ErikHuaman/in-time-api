import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Parametro } from './parametro.model';
import { ParametroDTO } from './parametro.dto';
import { getNextOrderValue } from '@common/utils/auto-increment.helper';
import { ParametroRepository } from './parametro.repository';

@Injectable()
export class ParametroService {
  constructor(private readonly repository: ParametroRepository) {}

  async findFirst(): Promise<Parametro | null> {
    return this.repository.findOne();
  }

  async create(dto: ParametroDTO): Promise<Parametro | null> {
    try {
      const orden = await this.repository.getNextOrderValue();
      return this.repository.create({ ...dto, orden });
    } catch (error) {
      console.log('error', error);
      if (error.name === 'SequelizeUniqueConstraintError') {
        throw new BadRequestException('Ya existe un registro con ese valor');
      }
      throw new InternalServerErrorException('Error interno');
    }
  }

  async update(id: string, dto: ParametroDTO): Promise<[number, Parametro[]]> {
    try {
      return this.repository.update(id, dto);
    } catch (error) {
      if (error.name === 'SequelizeUniqueConstraintError') {
        throw new BadRequestException('Ya existe un registro con ese valor');
      }
      throw new InternalServerErrorException('Error interno');
    }
  }
}

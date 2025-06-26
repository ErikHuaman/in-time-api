import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { TiempoContrato } from './tiempo-contrato.model';
import { TiempoContratoRepository } from './tiempo-contrato.repository';
import { PaginatedResponse } from '@common/interfaces/paginated-response.interface';

@Injectable()
export class TiempoContratoService {
  constructor(private readonly repository: TiempoContratoRepository) {}

  async findAll(): Promise<PaginatedResponse<TiempoContrato>> {
    return this.repository.findAndCountAll({
      order: [['orden', 'ASC']],
    });
  }

  async create(dto: Partial<TiempoContrato>): Promise<TiempoContrato | null> {
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
}

import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { TipoTurno } from './tipo-turno.model';
import { TipoTurnoRepository } from './tipo-turno.repository';
import { PaginatedResponse } from '@common/interfaces/paginated-response.interface';

@Injectable()
export class TipoTurnoService {
  constructor(private readonly repository: TipoTurnoRepository) {}

  async findAll(): Promise<PaginatedResponse<TipoTurno>> {
    return this.repository.findAndCountAll({
      where: { isActive: true },
      order: [['orden', 'ASC']],
    });
  }

  async create(dto: Partial<TipoTurno>): Promise<TipoTurno | null> {
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

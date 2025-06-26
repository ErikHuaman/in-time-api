import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { TurnoTrabajo } from './turno-trabajo.model';
import { TurnoTrabajoDTO } from './turno-trabajo.dto';
import { TurnoTrabajoRepository } from './turno-trabajo.repository';
import { PaginatedResponse } from '@common/interfaces/paginated-response.interface';

@Injectable()
export class TurnoTrabajoService {
  constructor(private readonly repository: TurnoTrabajoRepository) {}

  async findAll(): Promise<PaginatedResponse<TurnoTrabajo>> {
    return this.repository.findAndCountAll({
      order: [['orden', 'ASC']],
    });
  }

  async create(dto: TurnoTrabajoDTO): Promise<TurnoTrabajo | null> {
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

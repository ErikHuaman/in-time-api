import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { getNextOrderValue } from '@common/utils/auto-increment.helper';
import { EstadoAsistencia } from './estado-asistencia.model';
import { EstadoAsistenciaRepository } from './estado-asistencia.repository';
import { Usuario } from '@modules/usuario/usuario.model';
import { PaginatedResponse } from '@common/interfaces/paginated-response.interface';

@Injectable()
export class EstadoAsistenciaService {
  constructor(private readonly repository: EstadoAsistenciaRepository) {}

  async findAll(
    user: Usuario,
    limit: number,
    offset: number,
    filter?: boolean,
    search?: string,
  ): Promise<PaginatedResponse<EstadoAsistencia>> {
    const searchTerm = (search || '').toLowerCase();
    return this.repository.findAndCountAll({
      where: { isActive: true },
      order: [['orden', 'ASC']],
    });
  }

  async create(
    dto: Partial<EstadoAsistencia>,
  ): Promise<EstadoAsistencia | null> {
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

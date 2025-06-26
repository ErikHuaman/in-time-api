import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { JustificacionInasistencia } from './justificacion-inasistencia.model';
import { JustificacionInasistenciaDTO } from './justificacion-inasistencia.dto';
import { Usuario } from '@modules/usuario/usuario.model';
import { PaginatedResponse } from '@common/interfaces/paginated-response.interface';
import { JustificacionInasistenciaRepository } from './justificacion-inasistencia.repository';

@Injectable()
export class JustificacionInasistenciaService {
  constructor(
    private readonly repository: JustificacionInasistenciaRepository,
  ) {}

  async findAll(
    user: Usuario,
    limit: number,
    offset: number,
    filter?: boolean,
    search?: string,
  ): Promise<PaginatedResponse<JustificacionInasistencia>> {
    const searchTerm = (search || '').toLowerCase();
    return this.repository.findAndCountAll({
      limit,
      offset,
      order: [['orden', 'ASC']],
    });
  }

  async findOne(id: string): Promise<JustificacionInasistencia | null> {
    return this.repository.findOne({
      where: { id },
    });
  }

  async create(
    dto: Partial<JustificacionInasistencia>,
    archivo: Buffer<ArrayBufferLike>,
  ): Promise<JustificacionInasistencia | null> {
    try {
      dto.archivo = archivo;
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
    dto: JustificacionInasistenciaDTO,
  ): Promise<[number, JustificacionInasistencia[]]> {
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
  ): Promise<[number, JustificacionInasistencia[]]> {
    return this.repository.update(id, { isActive });
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }

  async restore(id: string): Promise<void> {
    await this.repository.restore(id);
  }
}

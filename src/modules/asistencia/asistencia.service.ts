import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { Asistencia } from './asistencia.model';
import { AsistenciaDTO } from './asistencia.dto';
import { Trabajador } from '@modules/trabajador/trabajador.model';
import { AsistenciaRepository } from './asistencia.repository';
import { PaginatedResponse } from '@common/interfaces/paginated-response.interface';
import { Usuario } from '@modules/usuario/usuario.model';

@Injectable()
export class AsistenciaService {
  constructor(private readonly repository: AsistenciaRepository) {}

  async findAll(
    user: Usuario,
    limit: number,
    offset: number,
    filter?: boolean,
    search?: string,
  ): Promise<PaginatedResponse<Asistencia>> {
    const searchTerm = (search || '').toLowerCase();
    return this.repository.findAndCountAll({
      limit,
      offset,
      order: [['orden', 'ASC']],
      include: [{ model: Trabajador }],
    });
  }

  async findOne(id: string): Promise<Asistencia | null> {
    return this.repository.findOne({
      where: { id },
    });
  }

  async create(dto: AsistenciaDTO): Promise<Asistencia | null> {
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
    dto: AsistenciaDTO,
  ): Promise<[number, Asistencia[]]> {
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
  ): Promise<[number, Asistencia[]]> {
    return this.repository.update(id, { isActive });
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }

  async restore(id: string): Promise<void> {
    await this.repository.restore(id);
  }
}

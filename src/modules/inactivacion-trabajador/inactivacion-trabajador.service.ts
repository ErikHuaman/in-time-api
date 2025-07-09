import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { getNextOrderValue } from '@common/utils/auto-increment.helper';
import { InactivacionTrabajador } from './inactivacion-trabajador.model';
import { InactivacionTrabajadorDTO } from './inactivacion-trabajador.dto';
import { Trabajador } from '@modules/trabajador/trabajador.model';
import { InactivacionTrabajadorRepository } from './inactivacion-trabajador.repository';
import { Usuario } from '@modules/usuario/usuario.model';
import { PaginatedResponse } from '@common/interfaces/paginated-response.interface';

@Injectable()
export class InactivacionTrabajadorService {
  constructor(private readonly repository: InactivacionTrabajadorRepository) {}

  async findAll(
    user: Usuario,
    limit: number,
    offset: number,
    filter?: boolean,
    search?: string,
  ): Promise<PaginatedResponse<InactivacionTrabajador>> {
    const searchTerm = (search || '').toLowerCase();
    return this.repository.findAndCountAll({
      include: [
        {
          model: Trabajador,
        },
      ],
      limit,
      offset,
      order: [['orden', 'DESC']],
    });
  }

  async findOne(id: string): Promise<InactivacionTrabajador | null> {
    return this.repository.findOne({
      where: { id },
    });
  }

  async create(
    dto: InactivacionTrabajadorDTO,
  ): Promise<InactivacionTrabajador | null> {
    try {
      const orden = await this.repository.getNextOrderValue();

      const fechaFin = new Date(dto.fechaFin);
      fechaFin.setHours(23, 59, 59);

      return this.repository.create({ ...dto, fechaFin, orden });
    } catch (error) {
      if (error.name === 'SequelizeUniqueConstraintError') {
        throw new BadRequestException('Ya existe un registro con ese valor');
      }
      throw new InternalServerErrorException('Error interno');
    }
  }

  async update(
    id: string,
    dto: InactivacionTrabajadorDTO,
  ): Promise<[number, InactivacionTrabajador[]]> {
    try {
      const fechaFin = new Date(dto.fechaFin);
      fechaFin.setHours(23, 59, 59);
      return this.repository.update(id, { ...dto, fechaFin });
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
  ): Promise<[number, InactivacionTrabajador[]]> {
    return this.repository.update(id, { isActive });
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }

  async restore(id: string): Promise<void> {
    await this.repository.restore(id);
  }
}

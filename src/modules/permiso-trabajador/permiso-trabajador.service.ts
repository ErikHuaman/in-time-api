import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { Sede } from '@modules/sede/sede.model';
import { Cargo } from '@modules/cargo/cargo.model';
import { Trabajador } from '@modules/trabajador/trabajador.model';
import { PermisoTrabajadorDTO } from './permiso-trabajador.dto';
import { PermisoTrabajador } from './permiso-trabajador.model';
import { PermisoTrabajadorRepository } from './permiso-trabajador.repository';
import { Usuario } from '@modules/usuario/usuario.model';
import { PaginatedResponse } from '@common/interfaces/paginated-response.interface';

@Injectable()
export class PermisoTrabajadorService {
  constructor(private readonly repository: PermisoTrabajadorRepository) {}

  async findAll(user: Usuario,
      limit: number,
      offset: number,
      filter?: boolean,
      search?: string,
    ): Promise<PaginatedResponse<PermisoTrabajador>> {
      const searchTerm = (search || '').toLowerCase();
    return this.repository.findAndCountAll({
      attributes: {
        exclude: ['archivo'],
      },
      include: [
        {
          model: Sede,
          required: true,
        },
        {
          model: Cargo,
          required: true,
        },
        {
          model: Trabajador,
          required: true,
        },
      ],
      limit,
      offset,
      order: [['orden', 'DESC']],
    });
  }

  async findOne(id: string): Promise<PermisoTrabajador | null> {
    return this.repository.findOne({
      where: { id },
    });
  }

  async create(
    dto: Partial<PermisoTrabajador>,
    archivo: Buffer<ArrayBufferLike>,
  ): Promise<PermisoTrabajador | null> {
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
    dto: PermisoTrabajadorDTO,
  ): Promise<[number, PermisoTrabajador[]]> {
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
  ): Promise<[number, PermisoTrabajador[]]> {
    return this.repository.update(id, { isActive });
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }

  async restore(id: string): Promise<void> {
    await this.repository.restore(id);
  }
}

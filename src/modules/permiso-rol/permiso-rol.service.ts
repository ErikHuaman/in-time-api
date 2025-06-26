import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { getNextOrderValue } from '@common/utils/auto-increment.helper';
import { PermisoRol } from './permiso-rol.model';
import { Usuario } from '@modules/usuario/usuario.model';
import { PaginatedResponse } from '@common/interfaces/paginated-response.interface';
import { PermisoRolRepository } from './permiso-rol.repository';

@Injectable()
export class PermisoRolService {
  constructor(private readonly repository: PermisoRolRepository) {}

  async findAll(
    user: Usuario,
    limit: number,
    offset: number,
    filter?: boolean,
    search?: string,
  ): Promise<PaginatedResponse<PermisoRol>> {
    const searchTerm = (search || '').toLowerCase();
    return this.repository.findAndCountAll({
      limit,
      offset,
    });
  }

  async findOne(id: string): Promise<PermisoRol | null> {
    return this.repository.findOne({
      where: { id },
    });
  }

  async create(dto: Partial<PermisoRol>): Promise<PermisoRol | null> {
    try {
      return this.repository.create({ ...dto });
    } catch (error) {
      throw new InternalServerErrorException(
        error,
        'Error interno del servidor',
      );
    }
  }

  async createMany(dtoList: Partial<PermisoRol>[]): Promise<PermisoRol[]> {
    return this.repository.bulkCreate(
      dtoList.map((item, i) => ({ ...item })),
      {
        updateOnDuplicate: ['leer', 'crear', 'editar', 'eliminar'],
        individualHooks: true,
        ignoreDuplicates: true,
      },
    );
  }

  async update(
    id: string,
    dto: Partial<PermisoRol>,
  ): Promise<[number, PermisoRol[]]> {
    try {
      const exist = await this.repository.findOne({ where: { id } });
      if (!exist) {
        throw new NotFoundException('PermisoRol no encontrado');
      }

      return this.repository.update(id, dto);
    } catch (error) {
      throw new InternalServerErrorException('Error interno del servidor');
    }
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }

  async restore(id: string): Promise<void> {
    await this.repository.restore(id);
  }
}

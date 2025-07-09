import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { GrupoModulo } from './grupo-modulo.model';
import { Modulo } from '@modules/modulo/modulo.model';
import { PermisoRol } from '@modules/permiso-rol/permiso-rol.model';
import { Op } from 'sequelize';
import { Rol } from '@modules/rol/rol.model';
import { GrupoModuloRepository } from './grupo-modulo.repository';
import { Usuario } from '@modules/usuario/usuario.model';
import { PaginatedResponse } from '@common/interfaces/paginated-response.interface';

@Injectable()
export class GrupoModuloService {
  constructor(private readonly repository: GrupoModuloRepository) {}

  async findAll(
    user: Usuario,
    limit: number,
    offset: number,
    filter?: boolean,
    search?: string,
  ): Promise<PaginatedResponse<GrupoModulo>> {
    const searchTerm = (search || '').toLowerCase();
    return this.repository.findAndCountAll({
      order: [
        ['orden', 'ASC'],
        [{ model: Modulo, as: 'modulos' }, 'orden', 'ASC'],
      ],
      include: [
        {
          model: Modulo,
          required: true,
        },
      ],
      limit,
      offset,
    });
  }

  async findAllPermisos(idUsuario: string): Promise<GrupoModulo[]> {
    return this.repository.findAll({
      order: [
        ['orden', 'ASC'],
        [{ model: Modulo, as: 'modulos' }, 'orden', 'ASC'],
      ],
      include: [
        {
          model: Modulo,
          include: [
            {
              model: PermisoRol,
              where: { idUsuario },
              required: false,
            },
          ],
          required: true,
        },
      ],
    });
  }

  async findOne(id: string): Promise<GrupoModulo | null> {
    return this.repository.findOne({
      where: { id },
    });
  }

  async create(dto: Partial<GrupoModulo>): Promise<GrupoModulo | null> {
    try {
      const orden = await this.repository.getNextOrderValue();
      return this.repository.create({ ...dto, orden });
    } catch (error) {
      throw new InternalServerErrorException(
        error,
        'Error interno del servidor',
      );
    }
  }

  async update(
    id: string,
    dto: Partial<GrupoModulo>,
  ): Promise<[number, GrupoModulo[]]> {
    try {
      const exist = await this.repository.findOne({ where: { id } });
      if (!exist) {
        throw new NotFoundException('GrupoModulo no encontrado');
      }

      return this.repository.update(id, dto);
    } catch (error) {
      throw new InternalServerErrorException('Error interno del servidor');
    }
  }

  async changeStatus(
    id: string,
    isActive: boolean,
  ): Promise<[number, GrupoModulo[]]> {
    return this.repository.update(id, { isActive });
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }

  async restore(id: string): Promise<void> {
    await this.repository.restore(id);
  }

  async findAllModulesByIdRol(idRol: string): Promise<GrupoModulo[]> {
    return this.repository.findAll({
      include: [
        {
          model: Modulo,
          where: {isActive: true},
          as: 'modulos', // 👈 debe coincidir con el alias del @BelongsToMany
          required: true,
          include: [
            {
              model: Rol,
              as: 'roles', // 👈 también debe coincidir si definiste @BelongsToMany con alias
              where: { id: idRol },
              required: true,
              through: {
                attributes: ['leer', 'crear', 'editar', 'eliminar'],
                where: {
                  leer: true,
                },
              },
            },
          ],
        },
      ],
      order: [
        ['orden', 'ASC'],
        [{ model: Modulo, as: 'modulos' }, 'orden', 'ASC'],
      ],
    });
  }
}

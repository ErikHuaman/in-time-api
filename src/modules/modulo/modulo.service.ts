import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Modulo } from './modulo.model';
import { GrupoModulo } from '@modules/grupo-modulo/grupo-modulo.model';
import { PermisoRol } from '@modules/permiso-rol/permiso-rol.model';
import { Rol } from '@modules/rol/rol.model';
import { ModuloRepository } from './modulo.repository';
import { Usuario } from '@modules/usuario/usuario.model';
import { PaginatedResponse } from '@common/interfaces/paginated-response.interface';

@Injectable()
export class ModuloService {
  constructor(private readonly repository: ModuloRepository) {}

  async findAll(
    user: Usuario,
    limit: number,
    offset: number,
    filter?: boolean,
    search?: string,
  ): Promise<PaginatedResponse<Modulo>> {
    const searchTerm = (search || '').toLowerCase();
    return this.repository.findAndCountAll({
      include: [
        {
          model: GrupoModulo,
          required: true,
        },
        {
          model: Rol,
          through: { attributes: [] },
        },
      ],
      limit,
      offset,
      order: [['orden', 'ASC']],
    });
  }

  async findAllByRol(idRol: string): Promise<any[]> {
    const modulos = await this.repository.findAll({
      include: [
        {
          model: GrupoModulo,
          required: true,
        },
        {
          model: Rol,
          where: { id: idRol },
          through: { attributes: ['leer', 'crear', 'editar', 'eliminar'] },
          required: false,
        },
      ],
      raw: false,
      order: [['orden', 'ASC']],
    });

    return modulos.map((modulo) => {
      const { roles, ...x } = modulo.get();
      let rol: Rol = roles?.[0];
      const permisos = new PermisoRol();
      permisos.get().idRol = idRol;
      permisos.get().idModulo = modulo.get().id;
      if (rol) {
        permisos.get().leer = rol.get().PermisoRol.get().leer;
        permisos.get().crear = rol.get().PermisoRol.get().crear;
        permisos.get().editar = rol.get().PermisoRol.get().editar;
        permisos.get().eliminar = rol.get().PermisoRol.get().eliminar;
      }

      return {
        ...x,
        rol,
        permisos,
      };
    });
  }

  async findOne(id: string): Promise<Modulo | null> {
    return this.repository.findOne({
      where: { id },
    });
  }

  async create(dto: Partial<Modulo>): Promise<Modulo | null> {
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

  async update(id: string, dto: Partial<Modulo>): Promise<[number, Modulo[]]> {
    try {
      const exist = await this.repository.findOne({ where: { id } });
      if (!exist) {
        throw new NotFoundException('Modulo no encontrado');
      }

      return this.repository.update(id, dto);
    } catch (error) {
      throw new InternalServerErrorException('Error interno del servidor');
    }
  }

  async changeStatus(
    id: string,
    isActive: boolean,
  ): Promise<[number, Modulo[]]> {
    return this.repository.update(id, { isActive });
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }

  async restore(id: string): Promise<void> {
    await this.repository.restore(id);
  }
}

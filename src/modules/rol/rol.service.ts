import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { Rol } from '@modules/rol/rol.model';
import { PermisoRol } from '@modules/permiso-rol/permiso-rol.model';
import { Modulo } from '@modules/modulo/modulo.model';
import { GrupoModulo } from '@modules/grupo-modulo/grupo-modulo.model';
import { col, fn, Op, where } from 'sequelize';
import { RolRepository } from './rol.repository';
import { Usuario } from '@modules/usuario/usuario.model';
import { PaginatedResponse } from '@common/interfaces/paginated-response.interface';

@Injectable()
export class RolService {
  constructor(private readonly repository: RolRepository) {}

  async findAll(
    user: Usuario,
    limit: number,
    offset: number,
    filter?: boolean,
    search?: string,
  ): Promise<PaginatedResponse<Rol>> {
    const searchTerm = (search || '').toLowerCase();
    let whereCondition: any = { isActive: true };
    if (['super', 'admin'].includes(user?.rol?.codigo)) {
      whereCondition = { isActive: true };
    } else {
      whereCondition = {
        isActive: true,
        codigo: {
          [Op.not]: 'super',
        },
      };
    }
    return this.repository.findAndCountAll({
      where: {
        ...whereCondition,
        ...(searchTerm && {
          [Op.or]: [
            where(fn('LOWER', col('Rol.nombre')), {
              [Op.like]: `%${searchTerm}%`,
            }),
          ],
        }),
      },
      limit,
      offset,
      order: [['orden', 'DESC']],
    });
  }

  async findOne(id: string): Promise<Rol | null> {
    return this.repository.findOne({
      where: { id },
      include: [
        {
          model: PermisoRol,
          include: [
            {
              model: Modulo,
              include: [
                {
                  model: GrupoModulo,
                },
              ],
            },
          ],
        },
      ],
    });
  }

  async create(dto: Partial<Rol>): Promise<Rol | null> {
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

  async update(id: string, dto: Partial<Rol>): Promise<[number, Rol[]]> {
    try {
      const exist = await this.repository.findOne({ where: { id } });
      if (!exist) {
        throw new NotFoundException('Rol no encontrado');
      }

      return this.repository.update(id, dto);
    } catch (error) {
      throw new InternalServerErrorException('Error interno del servidor');
    }
  }

  async changeStatus(id: string, isActive: boolean): Promise<[number, Rol[]]> {
    return this.repository.update(id, { isActive });
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }

  async restore(id: string): Promise<void> {
    await this.repository.restore(id);
  }

  getModuloByIdRol(id: string, url: string) {
    return this.repository.findOne({
      where: { id },
      include: [
        {
          model: Modulo,
          where: { url },
          through: { attributes: [] },
          required: true,
        },
      ],
    });
  }
}

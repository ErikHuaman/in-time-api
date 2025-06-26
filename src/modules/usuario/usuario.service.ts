import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import * as bcrypt from 'bcryptjs';
import { getNextOrderValue } from '@common/utils/auto-increment.helper';
import { Usuario } from './usuario.model';
import { Rol } from '@modules/rol/rol.model';
import { AsignacionSedeUsuario } from '@modules/asignacion-sede-usuario/asignacion-sede-usuario.model';
import { Sede } from '@modules/sede/sede.model';
import { col, fn, Op, where } from 'sequelize';
import { PaginatedResponse } from '@common/interfaces/paginated-response.interface';
import { UsuarioRepository } from './usuario.repository';

@Injectable()
export class UsuarioService {
  constructor(private readonly repository: UsuarioRepository) {}

  async findAll(
    user: Usuario,
    limit: number,
    offset: number,
    filter?: boolean,
    search?: string,
  ): Promise<PaginatedResponse<Usuario>> {
    const searchTerm = (search || '').toLowerCase();
    return this.repository.findAndCountAll({
      where: {
        ...(searchTerm && {
          [Op.or]: [
            where(fn('LOWER', col('Usuario.nombre')), {
              [Op.like]: `%${searchTerm}%`,
            }),
          ],
        }),
      },
      attributes: {
        exclude: ['archivo', 'descriptor', 'password', 'deletedAt'],
      },
      include: [
        {
          model: Rol,
          where:
            user.rol.codigo === 'super'
              ? {}
              : {
                  codigo: {
                    [Op.not]: 'super',
                  },
                },
        },
        { model: Sede, through: { attributes: [] }, required: false },
      ],
      limit,
      offset,
      order: [['orden', 'ASC']],
    });
  }

  async findAllFilter(): Promise<Usuario[]> {
    return this.repository.findAll({
      order: [['orden', 'ASC']],
      attributes: {
        exclude: ['archivo', 'descriptor', 'password', 'deletedAt'],
      },
      include: [
        {
          model: Rol,
          where: {
            codigo: {
              [Op.not]: 'super',
            },
          },
        },
        {
          model: Sede,
          through: { attributes: [] },
          include: [{ model: Sede, required: false }],
          required: false,
        },
      ],
    });
  }

  async findOne(id: string): Promise<Usuario | null> {
    return this.repository.findOne({
      where: { id },
      attributes: {
        exclude: ['archivo', 'descriptor', 'password', 'deletedAt'],
      },
      include: [
        {
          model: Rol,
        },
        {
          model: Sede,
          through: { attributes: [] },
          required: false,
        },
      ],
    });
  }

  async create(
    dto: Partial<Usuario>,
    archivo?: Buffer<ArrayBufferLike>,
    descriptor?: number[],
  ): Promise<Usuario | null> {
    try {
      dto.archivo = archivo;
      dto.descriptor = descriptor;
      const orden = await this.repository.getNextOrderValue();
      dto.username = dto.username?.toLowerCase();
      dto.password = bcrypt.hashSync(dto.password as string, 10);
      return this.repository.create({ ...dto, orden });
    } catch (error) {
      throw new InternalServerErrorException('Error interno del servidor');
    }
  }

  async update(
    id: string,
    dto: Partial<Usuario>,
    archivo?: Buffer<ArrayBuffer>,
    descriptor?: number[],
  ): Promise<[number, Usuario[]]> {
    try {
      const exist = await this.repository.findOne({ where: { id } });
      if (!exist) {
        throw new NotFoundException('Usuario no encontrado');
      }

      if (dto.password) {
        dto.password = bcrypt.hashSync(dto.password as string, 10);
      } else {
        dto.password = exist.get()?.password; // Mantener la contraseña existente si no se proporciona una nueva
      }

      dto.archivo = archivo;
      dto.descriptor = descriptor;

      return this.repository.update(id, dto);
    } catch (error) {
      throw new InternalServerErrorException('Error interno del servidor');
    }
  }

  async changeStatus(
    id: string,
    isActive: boolean,
  ): Promise<[number, Usuario[]]> {
    return this.repository.update(id, { isActive });
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }

  async restore(id: string): Promise<void> {
    await this.repository.restore(id);
  }

  async validateUsuario(
    username: string,
    password: string,
  ): Promise<Usuario | null> {
    const user = await this.repository.findOne({
      where: { username },
      include: [
        {
          model: Rol,
        },
      ],
    });
    if (!user) {
      return null;
    }
    if (!user?.get()?.isActive) {
      throw new BadRequestException('Usuario inactivo');
    }
    if (!user?.get()?.password) {
      throw new BadRequestException('Usuario sin contraseña');
    }
    const isValidPassword = await bcrypt.compare(
      password,
      user?.get()?.password,
    );
    if (isValidPassword) {
      const { password, ...result } = user.get();
      return result as Usuario;
    }
    return null;
  }

  async obtenerArchivo(id: string) {
    const result = await this.repository.findOne({
      where: { id },
    });
    if (!result) {
      throw new BadRequestException('No se encontró el registro');
    }
    return {
      id: result.get().id,
      fileName: result.get().archivoNombre,
      file: result.get().archivo,
    };
  }

  async findByDNI(identificacion: string): Promise<any | null> {
    const usuario = await this.repository.findOne({
      where: { identificacion, isActive: true },
      attributes: {
        exclude: ['archivo'],
      },
      include: [
        {
          model: Rol,
          where: { isActive: true },
        },
      ],
    });
    if (usuario) {
      return {
        identificacion: identificacion,
        nombres: `${usuario?.get()?.nombre} ${usuario?.get()?.apellido}`,
        cargo: usuario?.get()?.rol?.get()?.nombre,
        tieneRegistro: !!usuario?.get()?.archivoNombre,
        esTrabajador: false,
      };
    }
    return null;
  }
}

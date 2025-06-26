import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { getNextOrderValue } from '@common/utils/auto-increment.helper';
import { Trabajador } from '@modules/trabajador/trabajador.model';
import { AsistenciaUsuario } from './asistencia-usuario.model';
import { AsistenciaUsuarioDTO } from './asistencia-usuario.dto';
import { Op } from 'sequelize';
import { Usuario } from '@modules/usuario/usuario.model';
import { Dispositivo } from '@modules/dispositivo/dispositivo.model';
import { Sede } from '@modules/sede/sede.model';
import { Rol } from '@modules/rol/rol.model';
import { AsistenciaUsuarioRepository } from './asistencia-usuario.repository';
import { PaginatedResponse } from '@common/interfaces/paginated-response.interface';

@Injectable()
export class AsistenciaUsuarioService {
  constructor(private readonly repository: AsistenciaUsuarioRepository) {}

  async findAll(
    user: Usuario,
    limit: number,
    offset: number,
    filter?: boolean,
    search?: string,
  ): Promise<PaginatedResponse<AsistenciaUsuario>> {
    const searchTerm = (search || '').toLowerCase();
    return this.repository.findAndCountAll({
      limit,
      offset,
      order: [['orden', 'ASC']],
      include: [{ model: Trabajador }],
    });
  }

  async findAllByMonth(date: Date): Promise<AsistenciaUsuario[]> {
    const fecha = new Date(date);
    // Primer día del mes
    const primerDia = new Date(fecha.getFullYear(), fecha.getMonth(), 1);

    // Último día del mes
    const ultimoDia = new Date(fecha.getFullYear(), fecha.getMonth() + 1, 0);

    return this.repository.findAll({
      where: {
        fecha: {
          [Op.between]: [
            primerDia.toISOString().split('T')[0],
            ultimoDia.toISOString().split('T')[0],
          ],
        },
      },
      include: [
        {
          model: Usuario,
          attributes: {
            exclude: ['password', 'archivo', 'archivoNombre', 'descriptor'],
          },
          include: [
            {
              model: Rol,
            },
          ],
        },
        { model: Dispositivo, include: [{ model: Sede }] },
      ],
    });
  }

  async findOne(id: string): Promise<AsistenciaUsuario | null> {
    return this.repository.findOne({
      where: { id },
    });
  }

  async create(dto: AsistenciaUsuarioDTO): Promise<AsistenciaUsuario | null> {
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
    dto: AsistenciaUsuarioDTO,
  ): Promise<[number, AsistenciaUsuario[]]> {
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
  ): Promise<[number, AsistenciaUsuario[]]> {
    return this.repository.update(id, { isActive });
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }

  async restore(id: string): Promise<void> {
    await this.repository.restore(id);
  }
}

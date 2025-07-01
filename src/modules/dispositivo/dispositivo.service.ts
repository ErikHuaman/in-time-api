import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Dispositivo } from './dispositivo.model';
import { Sede } from '@modules/sede/sede.model';
import { DispositivoDTO } from './dispositivo.dto';
import { getNextOrderValue } from '@common/utils/auto-increment.helper';
import { Ciudad } from '@modules/localizacion/ciudad/ciudad.model';
import { Provincia } from '@modules/localizacion/provincia/provincia.model';
import { DispositivoRepository } from './dispositivo.repository';
import { Usuario } from '@modules/usuario/usuario.model';
import { PaginatedResponse } from '@common/interfaces/paginated-response.interface';

@Injectable()
export class DispositivoService {
  constructor(private readonly repository: DispositivoRepository) {}

  async findAll(
    user: Usuario,
    limit: number,
    offset: number,
    filter?: boolean,
    search?: string,
  ): Promise<PaginatedResponse<Dispositivo>> {
    const searchTerm = (search || '').toLowerCase();
    return this.repository.findAndCountAll({
      order: [['orden', 'ASC']],
      include: [
        {
          model: Sede,
        },
      ],
      limit,
      offset,
    });
  }

  async findOne(id: string): Promise<Dispositivo | null> {
    return this.repository.findOne({
      where: { id },
      include: [
        {
          model: Sede,
          required: true,
        },
      ],
    });
  }

  async create(dto: DispositivoDTO): Promise<Dispositivo | null> {
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
    dto: DispositivoDTO,
  ): Promise<[number, Dispositivo[]]> {
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
  ): Promise<[number, Dispositivo[]]> {
    return this.repository.update(id, { isActive });
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }

  async restore(id: string): Promise<void> {
    await this.repository.restore(id);
  }

  async findByCode(codigo: string): Promise<any> {
    const result = await this.repository.findOne({
      where: { codigo, isActive: true },
      include: [
        {
          model: Sede,
          required: true,
          include: [
            {
              model: Ciudad,
              required: true,
              include: [{ model: Provincia, required: true }],
            },
          ],
        },
      ],
    });
    if (result) {
      const dispositivo = result.get({ plain: true });
      return {
        id: dispositivo.id,
        codigo: dispositivo.codigo,
        nombre: dispositivo.nombre,
        edificio: dispositivo.sede.nombre,
        ciudad: `${dispositivo.sede.ciudad.name}, ${dispositivo.sede.ciudad.province.name}`,
      };
    }
    throw new NotFoundException(
      'No se ha encontrado ningún dispositivo con el código proporcionado.',
    );
  }
}

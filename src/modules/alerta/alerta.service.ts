import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { Alerta } from './alerta.model';
import { AlertaRepository } from './alerta.repository';
import { Usuario } from '@modules/usuario/usuario.model';
import { PaginatedResponse } from '@common/interfaces/paginated-response.interface';

@Injectable()
export class AlertaService {
  constructor(private readonly repository: AlertaRepository) {}

  async findAll(
    user: Usuario,
    limit: number,
    offset: number,
    filter?: boolean,
    search?: string,
  ): Promise<PaginatedResponse<Alerta>> {
    const searchTerm = (search || '').toLowerCase();
    return this.repository.findAndCountAll({
      limit,
      offset,
      where: { idUsuario: user.id, isActive: true },
      order: [['orden', 'DESC']],
    });
  }

  async findOne(id: string): Promise<Alerta | null> {
    return this.repository.findOne({
      where: { id },
    });
  }

  async findAllHistoric(): Promise<Alerta[]> {
    return this.repository.findAll({
      order: [['orden', 'DESC']],
    });

  }

  async findAllByFecha(fecha: Date): Promise<Alerta[]> {
    return this.repository.findAll({
      where: { fecha },
    });
  }

  async create(dto: Alerta): Promise<Alerta | null> {
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

  async update(id: string, dto: Alerta): Promise<[number, Alerta[]]> {
    try {
      return this.repository.update(id, dto);
    } catch (error) {
      if (error.name === 'SequelizeUniqueConstraintError') {
        throw new BadRequestException('Ya existe un registro con ese valor');
      }
      throw new InternalServerErrorException('Error interno');
    }
  }

  async createMany(dtoList: Partial<Alerta>[]): Promise<Alerta[]> {
    const orden = await this.repository.getNextOrderValue();
    return this.repository.bulkCreate(
      dtoList.map((item, i) => ({ ...item, orden: orden + i })),
      {
        updateOnDuplicate: ['descripcion'],
        individualHooks: true,
        ignoreDuplicates: true,
      },
    );
  }

  async changeStatus(
    id: string,
    isActive: boolean,
  ): Promise<[number, Alerta[]]> {
    return this.repository.update(id, { isActive });
  }

  async changeLeido(id: string): Promise<[number, Alerta[]]> {
    return this.repository.update(id, { leido: true });
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }

  async restore(id: string): Promise<void> {
    await this.repository.restore(id);
  }
}

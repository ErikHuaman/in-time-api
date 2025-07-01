import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { Feriado } from './feriado.model';
import { FeriadoDTO } from './feriado.dto';
import { Op } from 'sequelize';
import { Usuario } from '@modules/usuario/usuario.model';
import { PaginatedResponse } from '@common/interfaces/paginated-response.interface';
import { FeriadoRepository } from './feriado.repository';

@Injectable()
export class FeriadoService {
  constructor(private readonly repository: FeriadoRepository) {}

  async findAll(
    user: Usuario,
    limit: number,
    offset: number,
    filter?: boolean,
    search?: string,
  ): Promise<PaginatedResponse<Feriado>> {
    const searchTerm = (search || '').toLowerCase();
    return this.repository.findAndCountAll({
      order: [['start', 'ASC']],
      limit,
      offset,
    });
  }

  async findOne(id: string): Promise<Feriado | null> {
    return this.repository.findOne({
      where: { id },
    });
  }

  async create(dto: FeriadoDTO): Promise<Feriado | null> {
    try {
      return this.repository.create({ ...dto });
    } catch (error) {
      if (error.name === 'SequelizeUniqueConstraintError') {
        throw new BadRequestException('Ya existe un registro con ese valor');
      }
      throw new InternalServerErrorException('Error interno');
    }
  }

  async update(id: string, dto: FeriadoDTO): Promise<[number, Feriado[]]> {
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
  ): Promise<[number, Feriado[]]> {
    return this.repository.update(id, { isActive });
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }

  async restore(id: string): Promise<void> {
    await this.repository.restore(id);
  }

  async findAllByMonth(date: Date): Promise<any[]> {
    const fecha = new Date(date);

    // Primer día del mes
    const primerDia = new Date(fecha.getFullYear(), fecha.getMonth(), 1);

    // Último día del mes
    const ultimoDia = new Date(fecha.getFullYear(), fecha.getMonth() + 1, 0);

    return this.repository.findAll({
      where: {
        start: {
          [Op.between]: [
            primerDia.toISOString().split('T')[0],
            ultimoDia.toISOString().split('T')[0],
          ],
        },
      },
      order: [['start', 'ASC']],
    });
  }
}

import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { Cargo } from './cargo.model';
import { CargoDTO } from './cargo.dto';
import { CargoRepository } from './cargo.repository';
import { PaginatedResponse } from '@common/interfaces/paginated-response.interface';
import { Usuario } from '@modules/usuario/usuario.model';
import { col, fn, Op, where } from 'sequelize';

@Injectable()
export class CargoService {
  constructor(private readonly repository: CargoRepository) {}

  async findAll(
    user: Usuario,
    limit: number,
    offset: number,
    filter?: boolean,
    search?: string,
  ): Promise<PaginatedResponse<Cargo>> {
    const searchTerm = (search || '').toLowerCase();
    let whereCondition: any = { isActive: true };
    let asignacionRequired = false;
    if (['super', 'admin'].includes(user?.rol?.codigo)) {
      whereCondition = { isActive: true };
    } else if (!filter) {
      whereCondition = { isActive: true };
    } else {
      asignacionRequired = true;
      whereCondition = {
        isActive: true,
        id: user?.id,
      };
    }
    return this.repository.findAndCountAll({
      where: {
        ...(searchTerm && {
          [Op.or]: [
            where(fn('LOWER', col('Cargo.nombre')), {
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

  async findOne(id: string): Promise<Cargo | null> {
    return this.repository.findOne({
      where: { id },
    });
  }

  async create(dto: CargoDTO): Promise<Cargo | null> {
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

  async update(id: string, dto: Partial<Cargo>): Promise<[number, Cargo[]]> {
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
  ): Promise<[number, Cargo[]]> {
    return this.repository.update(id, { isActive });
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }

  async restore(id: string): Promise<void> {
    await this.repository.restore(id);
  }
}

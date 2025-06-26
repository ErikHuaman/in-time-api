import { getNextOrderValue } from '@common/utils/auto-increment.helper';
import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { FondoPensiones } from './fondo-pensiones.model';
import { Usuario } from '@modules/usuario/usuario.model';
import { PaginatedResponse } from '@common/interfaces/paginated-response.interface';
import { FondoPensionesRepository } from './fondo-pensiones.repository';

@Injectable()
export class FondoPensionesService {
  constructor(private readonly repository: FondoPensionesRepository) {}

  async findAll(
    user: Usuario,
    limit: number,
    offset: number,
    filter?: boolean,
    search?: string,
  ): Promise<PaginatedResponse<FondoPensiones>> {
    const searchTerm = (search || '').toLowerCase();
    return this.repository.findAndCountAll({
      order: [['orden', 'ASC']],
    });
  }

  async create(dto: Partial<FondoPensiones>): Promise<FondoPensiones | null> {
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
    dto: Partial<FondoPensiones>,
  ): Promise<[number, FondoPensiones[]]> {
    try {
      return this.repository.update(id, dto);
    } catch (error) {
      if (error.name === 'SequelizeUniqueConstraintError') {
        throw new BadRequestException('Ya existe un registro con ese valor');
      }
      throw new InternalServerErrorException('Error interno');
    }
  }

  async updateMany(dtoList: Partial<FondoPensiones>[]): Promise<boolean> {
    await Promise.all(
      dtoList.map((item) =>
        this.repository.update(item.id!, {
          pension: item.pension,
          seguro: item.seguro,
          comision: item.comision,
        }),
      ),
    );
    return true;
  }
}

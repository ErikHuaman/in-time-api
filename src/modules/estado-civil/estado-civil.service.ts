import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { EstadoCivil } from './estado-civil.model';
import { getNextOrderValue } from '@common/utils/auto-increment.helper';
import { EstadoCivilRepository } from './estado-civil.repository';
import { Usuario } from '@modules/usuario/usuario.model';
import { PaginatedResponse } from '@common/interfaces/paginated-response.interface';

@Injectable()
export class EstadoCivilService {
  constructor(private readonly repository: EstadoCivilRepository) {}

  async findAll(
    user: Usuario,
    limit: number,
    offset: number,
    filter?: boolean,
    search?: string,
  ): Promise<PaginatedResponse<EstadoCivil>> {
    const searchTerm = (search || '').toLowerCase();
    return this.repository.findAndCountAll({
      order: [['orden', 'DESC']],
    });
  }

  async create(dto: Partial<EstadoCivil>): Promise<EstadoCivil | null> {
    const orden = await this.repository.getNextOrderValue();
    return this.repository.create({ ...dto, orden });
  }
}

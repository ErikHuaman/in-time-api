import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { FrecuenciaPago } from './frecuencia-pago.model';
import { getNextOrderValue } from '@common/utils/auto-increment.helper';
import { FrecuenciaPagoRepository } from './frecuencia-pago.repository';
import { Usuario } from '@modules/usuario/usuario.model';
import { PaginatedResponse } from '@common/interfaces/paginated-response.interface';

@Injectable()
export class FrecuenciaPagoService {
  constructor(private readonly repository: FrecuenciaPagoRepository) {}

  async findAll(
    user: Usuario,
    limit: number,
    offset: number,
    filter?: boolean,
    search?: string,
  ): Promise<PaginatedResponse<FrecuenciaPago>> {
    const searchTerm = (search || '').toLowerCase();
    return this.repository.findAndCountAll({
      order: [['orden', 'DESC']],
    });
  }

  async create(dto: Partial<FrecuenciaPago>): Promise<FrecuenciaPago | null> {
    const orden = await this.repository.getNextOrderValue();
    return this.repository.create({ ...dto, orden });
  }
}

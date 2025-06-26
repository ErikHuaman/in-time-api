import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { TipoDocIdent } from './tipo-doc-ident.model';
import { TipoDocIdentRepository } from './tipo-doc-ident.repository';
import { PaginatedResponse } from '@common/interfaces/paginated-response.interface';

@Injectable()
export class TipoDocIdentService {
  constructor(private readonly repository: TipoDocIdentRepository) {}

  async findAll(): Promise<PaginatedResponse<TipoDocIdent>> {
    return this.repository.findAndCountAll({
      order: [['orden', 'ASC']],
    });
  }

  async create(dto: Partial<TipoDocIdent>): Promise<TipoDocIdent | null> {
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
}

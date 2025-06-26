import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { ContratoTrabajador } from './contrato-trabajador.model';
import { ContratoTrabajadorRepository } from './contrato-trabajador.repository';

@Injectable()
export class ContratoTrabajadorService {
  constructor(
    private readonly repository: ContratoTrabajadorRepository,
  ) {}

  async findAll(): Promise<ContratoTrabajador[]> {
    return this.repository.findAll();
  }

  async findOne(id: string): Promise<ContratoTrabajador | null> {
    return this.repository.findOne({
      where: { id },
    });
  }

  async create(
    dto: Partial<ContratoTrabajador>,
  ): Promise<ContratoTrabajador | null> {
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
    dto: Partial<ContratoTrabajador>,
  ): Promise<[number, ContratoTrabajador[]]> {
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
  ): Promise<[number, ContratoTrabajador[]]> {
    return this.repository.update(id, { isActive });
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }

  async restore(id: string): Promise<void> {
    await this.repository.restore(id);
  }
}

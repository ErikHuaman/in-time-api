import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { getNextOrderValue } from '@common/utils/auto-increment.helper';
import { BeneficioTrabajador } from './beneficio-trabajador.model';
import { BeneficioTrabajadorDTO } from './beneficio-trabajador.dto';
import { BeneficioTrabajadorRepository } from './beneficio-trabajador.repository';

@Injectable()
export class BeneficioTrabajadorService {
  constructor(private readonly repository: BeneficioTrabajadorRepository) {}

  async findAll(): Promise<BeneficioTrabajador[]> {
    return this.repository.findAll();
  }

  async findOne(id: string): Promise<BeneficioTrabajador | null> {
    return this.repository.findOne({
      where: { id },
    });
  }

  async create(
    dto: BeneficioTrabajadorDTO,
  ): Promise<BeneficioTrabajador | null> {
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
    dto: BeneficioTrabajadorDTO,
  ): Promise<[number, BeneficioTrabajador[]]> {
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
  ): Promise<[number, BeneficioTrabajador[]]> {
    return this.repository.update(id, { isActive });
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }

  async restore(id: string): Promise<void> {
    await this.repository.restore(id);
  }
}

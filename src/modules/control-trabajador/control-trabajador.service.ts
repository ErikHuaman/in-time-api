import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { ControlTrabajador } from './control-trabajador.model';
import { ControlTrabajadorDTO } from './control-trabajador.dto';
import { ControlTrabajadorRepository } from './control-trabajador.repository';

@Injectable()
export class ControlTrabajadorService {
  constructor(
    private readonly repository: ControlTrabajadorRepository,
  ) {}

  async findAll(): Promise<ControlTrabajador[]> {
    return this.repository.findAll();
  }

  async findOne(id: string): Promise<ControlTrabajador | null> {
    return this.repository.findOne({
      where: { id },
    });
  }

  async create(dto: ControlTrabajadorDTO): Promise<ControlTrabajador | null> {
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
    dto: ControlTrabajadorDTO,
  ): Promise<[number, ControlTrabajador[]]> {
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
  ): Promise<[number, ControlTrabajador[]]> {
    return this.repository.update(id, { isActive });
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }

  async restore(id: string): Promise<void> {
    await this.repository.restore(id);
  }
}

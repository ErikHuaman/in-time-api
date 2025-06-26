import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { getNextOrderValue } from '@common/utils/auto-increment.helper';
import { ContactoTrabajador } from './contacto-trabajador.model';
import { ContactoTrabajadorDTO } from './contacto-trabajador.dto';
import { ContactoTrabajadorRepository } from './contacto-trabajador.repository';

@Injectable()
export class ContactoTrabajadorService {
  constructor(private readonly repository: ContactoTrabajadorRepository) {}

  async findAll(): Promise<ContactoTrabajador[]> {
    return this.repository.findAll();
  }

  async findOne(id: string): Promise<ContactoTrabajador | null> {
    return this.repository.findOne({
      where: { id },
    });
  }

  async create(dto: ContactoTrabajadorDTO): Promise<ContactoTrabajador | null> {
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
    dto: ContactoTrabajadorDTO,
  ): Promise<[number, ContactoTrabajador[]]> {
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
  ): Promise<[number, ContactoTrabajador[]]> {
    return this.repository.update(id, { isActive });
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }

  async restore(id: string): Promise<void> {
    await this.repository.restore(id);
  }
}

import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Pais } from '@modules/localizacion/pais/pais.model';
import { Region } from '@modules/localizacion/region/region.model';
import { Provincia } from '@modules/localizacion/provincia/provincia.model';
import { Ciudad } from '@modules/localizacion/ciudad/ciudad.model';
import { getNextOrderValue } from '@common/utils/auto-increment.helper';
import { InfoTrabajador } from './info-trabajador.model';
import { InfoTrabajadorDTO } from './info-trabajador.dto';
import { InfoTrabajadorRepository } from './info-trabajador.repository';

@Injectable()
export class InfoTrabajadorService {
  constructor(private readonly repository: InfoTrabajadorRepository) {}

  async findAll(): Promise<InfoTrabajador[]> {
    return this.repository.findAll();
  }

  async findOne(id: string): Promise<InfoTrabajador | null> {
    return this.repository.findOne({
      where: { id },
      include: [
        {
          model: Ciudad,
          required: true,
          attributes: {
            exclude: ['createdAt', 'updatedAt'],
          },
          include: [
            {
              model: Provincia,
              required: true,
              attributes: {
                exclude: ['createdAt', 'updatedAt'],
              },
              include: [
                {
                  model: Region,
                  required: true,
                  attributes: {
                    exclude: ['createdAt', 'updatedAt'],
                  },
                  include: [
                    {
                      model: Pais,
                      required: true,
                      attributes: {
                        exclude: ['createdAt', 'updatedAt'],
                      },
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    });
  }

  async create(dto: InfoTrabajadorDTO): Promise<InfoTrabajador | null> {
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
    dto: InfoTrabajadorDTO,
  ): Promise<[number, InfoTrabajador[]]> {
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
  ): Promise<[number, InfoTrabajador[]]> {
    return this.repository.update(id, { isActive });
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }

  async restore(id: string): Promise<void> {
    await this.repository.restore(id);
  }
}

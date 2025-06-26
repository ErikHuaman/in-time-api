import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Provincia } from './provincia.model';

@Injectable()
export class ProvinciaService {
  constructor(
    @InjectModel(Provincia)
    private readonly model: typeof Provincia,
  ) {}

  async findAll(): Promise<Provincia[]> {
    return this.model.findAll({
      attributes: {
        exclude: ['createdAt', 'updatedAt'],
      },
      order: [['name', 'ASC']],
    });
  }

  async findOne(id: string): Promise<Provincia | null> {
    return this.model.findOne({
      where: { id },
      attributes: {
        exclude: ['createdAt', 'updatedAt'],
      },
    });
  }

  async findByState(idState: string): Promise<Provincia[]> {
    return this.model.findAll({
      where: { idState },
      attributes: {
        exclude: ['createdAt', 'updatedAt'],
      },
      order: [['name', 'ASC']],
    });
  }

  async create(dto: Partial<Provincia>): Promise<Provincia | null> {
    return this.model.create(dto);
  }

  async createMany(dtoList: Partial<Provincia>[]): Promise<Provincia[]> {
    return this.model.bulkCreate(dtoList, {
      individualHooks: true,
      ignoreDuplicates: true,
    });
  }
}

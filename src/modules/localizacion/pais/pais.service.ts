import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Pais } from './pais.model';

@Injectable()
export class PaisService {
  constructor(
    @InjectModel(Pais)
    private readonly model: typeof Pais,
  ) {}

  async findAll(): Promise<Pais[]> {
    return this.model.findAll({
      attributes: {
        exclude: ['createdAt', 'updatedAt'],
      },
      order: [['iso3', 'ASC']],
    });
  }

  async findOne(iso3: string): Promise<Pais | null> {
    return this.model.findOne({
      where: { iso3 },
      attributes: {
        exclude: ['createdAt', 'updatedAt'],
      },
    });
  }

  async create(dto: Partial<Pais>): Promise<Pais | null> {
    return this.model.create(dto);
  }

  async createMany(dtoList: Partial<Pais>[]): Promise<Pais[]> {
    return this.model.bulkCreate(dtoList, {
      individualHooks: true,
      ignoreDuplicates: true,
    });
  }
}

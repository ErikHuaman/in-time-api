import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Region } from './region.model';

@Injectable()
export class RegionService {
  constructor(
    @InjectModel(Region)
    private readonly model: typeof Region,
  ) {}

  async findAll(): Promise<Region[]> {
    return this.model.findAll({
      // attributes: {
      //   exclude: ['createdAt', 'updatedAt'],
      // },
      order: [['stateCode', 'ASC']],
    });
  }

  async findOne(id: string): Promise<Region | null> {
    return this.model.findOne({
      where: { id },
      attributes: {
        exclude: ['createdAt', 'updatedAt'],
      },
    });
  }

  async findByCountry(idCountry: string): Promise<Region[]> {
    return this.model.findAll({
      where: { idCountry },
      attributes: {
        exclude: ['createdAt', 'updatedAt'],
      },
      order: [['stateCode', 'ASC']],
    });
  }

  async create(dto: Partial<Region>): Promise<Region | null> {
    return this.model.create(dto);
  }

  async createMany(dtoList: Partial<Region>[]): Promise<Region[]> {
    return this.model.bulkCreate(dtoList, {
      individualHooks: true,
      ignoreDuplicates: true,
    });
  }
}

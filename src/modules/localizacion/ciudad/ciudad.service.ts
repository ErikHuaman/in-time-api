import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Ciudad } from './ciudad.model';

@Injectable()
export class CiudadService {
  constructor(
    @InjectModel(Ciudad)
    private readonly model: typeof Ciudad,
  ) {}

  async findAll(): Promise<Ciudad[]> {
    return this.model.findAll({
      //   attributes: {
      //     exclude: ['createdAt', 'updatedAt'],
      //   },
      order: [['name', 'ASC']],
    });
  }

  async findOne(id: string): Promise<Ciudad | null> {
    return this.model.findOne({
      where: { id },
      attributes: {
        exclude: ['createdAt', 'updatedAt'],
      },
    });
  }

  async findByProvince(idProvince: string): Promise<Ciudad[]> {
    return this.model.findAll({
      where: { idProvince },
      attributes: {
        exclude: ['createdAt', 'updatedAt'],
      },
      order: [['name', 'ASC']],
    });
  }

  async create(dto: Partial<Ciudad>): Promise<Ciudad | null> {
    return this.model.create(dto);
  }

  async createMany(dtoList: Partial<Ciudad>[]): Promise<Ciudad[]> {
    return this.model.bulkCreate(dtoList, {
      individualHooks: true,
      ignoreDuplicates: true,
    });
  }
}

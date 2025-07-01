import { PaginatedResponse } from '@common/interfaces/paginated-response.interface';
import { getNextOrderValue } from '@common/utils/auto-increment.helper';
import { NotFoundException } from '@nestjs/common';
import {
  BulkCreateOptions,
  DestroyOptions,
  FindOptions,
  UpdateOptions,
  WhereOptions,
} from 'sequelize';
import { Model, ModelStatic } from 'sequelize-typescript';

export class GenericCrudRepository<T extends Model> {
  protected readonly model: ModelStatic<T> & typeof Model;

  constructor(model: ModelStatic<T>) {
    this.model = model as ModelStatic<T> & typeof Model;
  }

  async findAll(options?: FindOptions<T>): Promise<T[]> {
    const results = await this.model.findAll({
      ...options,
    } as FindOptions);

    return results as T[];
  }

  async findAndCountAll(
    options?: FindOptions<T>,
  ): Promise<PaginatedResponse<T>> {
    const results = await this.model.findAndCountAll({
      ...options,
    } as FindOptions);

    return {
      total: results.count,
      limit: options?.limit,
      offset: options?.offset,
      data: results.rows as T[],
    };
  }

  async findOne(options?: FindOptions<T> & { scopes?: string[] }): Promise<T> {
    const { scopes = [], ...findOptions } = options || {};

    // Aplica los scopes dinámicamente si están presentes
    const query = scopes.length > 0 ? this.model.scope(...scopes) : this.model;

    const item = await query.findOne({
      ...findOptions,
    });
    if (!item) throw new NotFoundException(`${this.model.name} no encontrado`);
    return item as T;
  }

  async create(dto: Partial<T>, options?: any): Promise<T> {
    const item = await this.model.create(dto, options);
    return item as T;
  }

  async bulkCreate(
    dtos: Partial<T>[],
    options?: BulkCreateOptions<any>,
    restoreOpts?: FindOptions<T>,
  ): Promise<T[]> {
    if (restoreOpts) {
      const restoreAll = await this.model.findAll({
        ...options,
        paranoid: true,
      } as FindOptions);

      await Promise.all(restoreAll.map((res) => res.restore()));
    }

    const items = await this.model.bulkCreate(dtos, options);
    return items as T[];
  }

  async update(
    id: string,
    dto: Partial<T>,
  ): Promise<[count: number, rows: T[]]> {
    const [count] = await this.model.update(dto, {
      where: { id },
      returning: true,
    } as UpdateOptions);

    const row = await this.model.findOne({ where: { id } } as FindOptions);

    return [count, [row] as T[]];
  }

  async delete(id: string): Promise<void> {
    await this.model.destroy({ where: { id } as unknown as WhereOptions<any> });
  }

  async bulkDestroy(options?: DestroyOptions<T>): Promise<void> {
    await this.model.destroy(options);
  }

  async restore(id: string): Promise<void> {
    await this.model.restore({ where: { id } as unknown as WhereOptions<any> });
  }

  async getNextOrderValue(): Promise<number> {
    return await getNextOrderValue(this.model);
  }
}

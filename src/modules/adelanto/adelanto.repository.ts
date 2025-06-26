import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { GenericCrudRepository } from '@common/repositories/generic-crud.repository';
import { Adelanto } from './adelanto.model';

@Injectable()
export class AdelantoRepository extends GenericCrudRepository<Adelanto> {
  constructor(
    @InjectModel(Adelanto)
    model: typeof Adelanto,
  ) {
    super(model);
  }
}

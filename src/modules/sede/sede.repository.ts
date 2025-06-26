import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { GenericCrudRepository } from '@common/repositories/generic-crud.repository';
import { Sede } from './sede.model';

@Injectable()
export class SedeRepository extends GenericCrudRepository<Sede> {
  constructor(
    @InjectModel(Sede)
    model: typeof Sede,
  ) {
    super(model);
  }
}

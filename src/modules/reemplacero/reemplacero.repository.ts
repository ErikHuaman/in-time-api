import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { GenericCrudRepository } from '@common/repositories/generic-crud.repository';
import { Reemplacero } from './reemplacero.model';

@Injectable()
export class ReemplaceroRepository extends GenericCrudRepository<Reemplacero> {
  constructor(
    @InjectModel(Reemplacero)
    model: typeof Reemplacero,
  ) {
    super(model);
  }
}

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { GenericCrudRepository } from '@common/repositories/generic-crud.repository';
import { Cargo } from './cargo.model';

@Injectable()
export class CargoRepository extends GenericCrudRepository<Cargo> {
  constructor(
    @InjectModel(Cargo)
    model: typeof Cargo,
  ) {
    super(model);
  }
}

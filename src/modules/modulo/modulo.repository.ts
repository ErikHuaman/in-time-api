import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { GenericCrudRepository } from '@common/repositories/generic-crud.repository';
import { Modulo } from './modulo.model';

@Injectable()
export class ModuloRepository extends GenericCrudRepository<Modulo> {
  constructor(
    @InjectModel(Modulo)
    model: typeof Modulo,
  ) {
    super(model);
  }
}

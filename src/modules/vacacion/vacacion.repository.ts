import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { GenericCrudRepository } from '@common/repositories/generic-crud.repository';
import { Vacacion } from './vacacion.model';

@Injectable()
export class VacacionRepository extends GenericCrudRepository<Vacacion> {
  constructor(
    @InjectModel(Vacacion)
    model: typeof Vacacion,
  ) {
    super(model);
  }
}

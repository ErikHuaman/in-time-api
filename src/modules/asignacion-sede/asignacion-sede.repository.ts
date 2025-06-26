import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { GenericCrudRepository } from '@common/repositories/generic-crud.repository';
import { AsignacionSede } from './asignacion-sede.model';

@Injectable()
export class AsignacionSedeRepository extends GenericCrudRepository<AsignacionSede> {
  constructor(
    @InjectModel(AsignacionSede)
    model: typeof AsignacionSede,
  ) {
    super(model);
  }
}

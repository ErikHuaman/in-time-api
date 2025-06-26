import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { GenericCrudRepository } from '@common/repositories/generic-crud.repository';
import { TurnoTrabajo } from './turno-trabajo.model';

@Injectable()
export class TurnoTrabajoRepository extends GenericCrudRepository<TurnoTrabajo> {
  constructor(
    @InjectModel(TurnoTrabajo)
    model: typeof TurnoTrabajo,
  ) {
    super(model);
  }
}

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { GenericCrudRepository } from '@common/repositories/generic-crud.repository';
import { EstadoCivil } from './estado-civil.model';

@Injectable()
export class EstadoCivilRepository extends GenericCrudRepository<EstadoCivil> {
  constructor(
    @InjectModel(EstadoCivil)
    model: typeof EstadoCivil,
  ) {
    super(model);
  }
}

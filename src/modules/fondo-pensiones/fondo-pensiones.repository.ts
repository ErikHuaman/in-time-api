import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { GenericCrudRepository } from '@common/repositories/generic-crud.repository';
import { FondoPensiones } from './fondo-pensiones.model';

@Injectable()
export class FondoPensionesRepository extends GenericCrudRepository<FondoPensiones> {
  constructor(
    @InjectModel(FondoPensiones)
    model: typeof FondoPensiones,
  ) {
    super(model);
  }
}

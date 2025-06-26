import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { GenericCrudRepository } from '@common/repositories/generic-crud.repository';
import { CorreccionMarcacion } from './correccion-marcacion.model';

@Injectable()
export class CorreccionMarcacionRepository extends GenericCrudRepository<CorreccionMarcacion> {
  constructor(
    @InjectModel(CorreccionMarcacion)
    model: typeof CorreccionMarcacion,
  ) {
    super(model);
  }
}

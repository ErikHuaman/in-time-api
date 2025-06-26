import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { GenericCrudRepository } from '@common/repositories/generic-crud.repository';
import { Parametro } from './parametro.model';

@Injectable()
export class ParametroRepository extends GenericCrudRepository<Parametro> {
  constructor(
    @InjectModel(Parametro)
    model: typeof Parametro,
  ) {
    super(model);
  }
}

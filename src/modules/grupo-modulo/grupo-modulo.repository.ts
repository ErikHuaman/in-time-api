import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { GenericCrudRepository } from '@common/repositories/generic-crud.repository';
import { GrupoModulo } from './grupo-modulo.model';

@Injectable()
export class GrupoModuloRepository extends GenericCrudRepository<GrupoModulo> {
  constructor(
    @InjectModel(GrupoModulo)
    model: typeof GrupoModulo,
  ) {
    super(model);
  }
}

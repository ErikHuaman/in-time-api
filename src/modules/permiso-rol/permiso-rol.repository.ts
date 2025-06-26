import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { GenericCrudRepository } from '@common/repositories/generic-crud.repository';
import { PermisoRol } from './permiso-rol.model';

@Injectable()
export class PermisoRolRepository extends GenericCrudRepository<PermisoRol> {
  constructor(
    @InjectModel(PermisoRol)
    model: typeof PermisoRol,
  ) {
    super(model);
  }
}

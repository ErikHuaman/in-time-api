import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { GenericCrudRepository } from '@common/repositories/generic-crud.repository';
import { PermisoTrabajador } from './permiso-trabajador.model';

@Injectable()
export class PermisoTrabajadorRepository extends GenericCrudRepository<PermisoTrabajador> {
  constructor(
    @InjectModel(PermisoTrabajador)
    model: typeof PermisoTrabajador,
  ) {
    super(model);
  }
}

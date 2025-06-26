import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { GenericCrudRepository } from '@common/repositories/generic-crud.repository';
import { Rol } from './rol.model';

@Injectable()
export class RolRepository extends GenericCrudRepository<Rol> {
  constructor(
    @InjectModel(Rol)
    model: typeof Rol,
  ) {
    super(model);
  }
}

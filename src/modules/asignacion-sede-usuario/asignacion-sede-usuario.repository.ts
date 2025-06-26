import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { GenericCrudRepository } from '@common/repositories/generic-crud.repository';
import { AsignacionSedeUsuario } from './asignacion-sede-usuario.model';

@Injectable()
export class AsignacionSedeUsuarioRepository extends GenericCrudRepository<AsignacionSedeUsuario> {
  constructor(
    @InjectModel(AsignacionSedeUsuario)
    model: typeof AsignacionSedeUsuario,
  ) {
    super(model);
  }
}

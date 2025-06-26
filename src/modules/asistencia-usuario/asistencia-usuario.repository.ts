import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { GenericCrudRepository } from '@common/repositories/generic-crud.repository';
import { AsistenciaUsuario } from './asistencia-usuario.model';

@Injectable()
export class AsistenciaUsuarioRepository extends GenericCrudRepository<AsistenciaUsuario> {
  constructor(
    @InjectModel(AsistenciaUsuario)
    model: typeof AsistenciaUsuario,
  ) {
    super(model);
  }
}

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { GenericCrudRepository } from '@common/repositories/generic-crud.repository';
import { Usuario } from './usuario.model';

@Injectable()
export class UsuarioRepository extends GenericCrudRepository<Usuario> {
  constructor(
    @InjectModel(Usuario)
    model: typeof Usuario,
  ) {
    super(model);
  }
}

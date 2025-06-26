import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { GenericCrudRepository } from '@common/repositories/generic-crud.repository';
import { Trabajador } from './trabajador.model';

@Injectable()
export class TrabajadorRepository extends GenericCrudRepository<Trabajador> {
  constructor(
    @InjectModel(Trabajador)
    model: typeof Trabajador,
  ) {
    super(model);
  }
}

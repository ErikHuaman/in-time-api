import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { GenericCrudRepository } from '@common/repositories/generic-crud.repository';
import { InactivacionTrabajador } from './inactivacion-trabajador.model';

@Injectable()
export class InactivacionTrabajadorRepository extends GenericCrudRepository<InactivacionTrabajador> {
  constructor(
    @InjectModel(InactivacionTrabajador)
    model: typeof InactivacionTrabajador,
  ) {
    super(model);
  }
}

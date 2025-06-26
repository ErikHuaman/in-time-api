import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { GenericCrudRepository } from '@common/repositories/generic-crud.repository';
import { ControlTrabajador } from './control-trabajador.model';

@Injectable()
export class ControlTrabajadorRepository extends GenericCrudRepository<ControlTrabajador> {
  constructor(
    @InjectModel(ControlTrabajador)
    model: typeof ControlTrabajador,
  ) {
    super(model);
  }
}

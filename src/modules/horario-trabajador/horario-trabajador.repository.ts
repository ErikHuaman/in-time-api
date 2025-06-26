import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { GenericCrudRepository } from '@common/repositories/generic-crud.repository';
import { HorarioTrabajador } from './horario-trabajador.model';

@Injectable()
export class HorarioTrabajadorRepository extends GenericCrudRepository<HorarioTrabajador> {
  constructor(
    @InjectModel(HorarioTrabajador)
    model: typeof HorarioTrabajador,
  ) {
    super(model);
  }
}

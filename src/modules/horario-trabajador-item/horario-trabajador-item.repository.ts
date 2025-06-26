import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { GenericCrudRepository } from '@common/repositories/generic-crud.repository';
import { HorarioTrabajadorItem } from './horario-trabajador-item.model';

@Injectable()
export class HorarioTrabajadorItemRepository extends GenericCrudRepository<HorarioTrabajadorItem> {
  constructor(
    @InjectModel(HorarioTrabajadorItem)
    model: typeof HorarioTrabajadorItem,
  ) {
    super(model);
  }
}

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { GenericCrudRepository } from '@common/repositories/generic-crud.repository';
import { PatronHorarioItem } from './patron-horario-item.model';

@Injectable()
export class PatronHorarioItemRepository extends GenericCrudRepository<PatronHorarioItem> {
  constructor(
    @InjectModel(PatronHorarioItem)
    model: typeof PatronHorarioItem,
  ) {
    super(model);
  }
}

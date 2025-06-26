import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { GenericCrudRepository } from '@common/repositories/generic-crud.repository';
import { PatronHorario } from './patron-horario.model';

@Injectable()
export class PatronHorarioRepository extends GenericCrudRepository<PatronHorario> {
  constructor(
    @InjectModel(PatronHorario)
    model: typeof PatronHorario,
  ) {
    super(model);
  }
}

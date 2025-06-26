import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { GenericCrudRepository } from '@common/repositories/generic-crud.repository';
import { Asistencia } from './asistencia.model';

@Injectable()
export class AsistenciaRepository extends GenericCrudRepository<Asistencia> {
  constructor(
    @InjectModel(Asistencia)
    model: typeof Asistencia,
  ) {
    super(model);
  }
}

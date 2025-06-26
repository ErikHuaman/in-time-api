import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { GenericCrudRepository } from '@common/repositories/generic-crud.repository';
import { EstadoAsistencia } from './estado-asistencia.model';

@Injectable()
export class EstadoAsistenciaRepository extends GenericCrudRepository<EstadoAsistencia> {
  constructor(
    @InjectModel(EstadoAsistencia)
    model: typeof EstadoAsistencia,
  ) {
    super(model);
  }
}

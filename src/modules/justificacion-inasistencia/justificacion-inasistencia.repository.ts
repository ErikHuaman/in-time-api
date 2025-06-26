import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { GenericCrudRepository } from '@common/repositories/generic-crud.repository';
import { JustificacionInasistencia } from './justificacion-inasistencia.model';

@Injectable()
export class JustificacionInasistenciaRepository extends GenericCrudRepository<JustificacionInasistencia> {
  constructor(
    @InjectModel(JustificacionInasistencia)
    model: typeof JustificacionInasistencia,
  ) {
    super(model);
  }
}

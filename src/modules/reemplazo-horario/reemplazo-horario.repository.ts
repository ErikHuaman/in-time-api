import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { GenericCrudRepository } from '@common/repositories/generic-crud.repository';
import { ReemplazoHorario } from './reemplazo-horario.model';

@Injectable()
export class ReemplazoHorarioRepository extends GenericCrudRepository<ReemplazoHorario> {
  constructor(
    @InjectModel(ReemplazoHorario)
    model: typeof ReemplazoHorario,
  ) {
    super(model);
  }
}

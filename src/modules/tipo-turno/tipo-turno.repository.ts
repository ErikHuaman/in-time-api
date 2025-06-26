import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { GenericCrudRepository } from '@common/repositories/generic-crud.repository';
import { TipoTurno } from './tipo-turno.model';

@Injectable()
export class TipoTurnoRepository extends GenericCrudRepository<TipoTurno> {
  constructor(
    @InjectModel(TipoTurno)
    model: typeof TipoTurno,
  ) {
    super(model);
  }
}

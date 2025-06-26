import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { GenericCrudRepository } from '@common/repositories/generic-crud.repository';
import { Alerta } from './alerta.model';

@Injectable()
export class AlertaRepository extends GenericCrudRepository<Alerta> {
  constructor(
    @InjectModel(Alerta)
    model: typeof Alerta,
  ) {
    super(model);
  }
}

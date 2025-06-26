import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { GenericCrudRepository } from '@common/repositories/generic-crud.repository';
import { Feriado } from './feriado.model';

@Injectable()
export class FeriadoRepository extends GenericCrudRepository<Feriado> {
  constructor(
    @InjectModel(Feriado)
    model: typeof Feriado,
  ) {
    super(model);
  }
}

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { GenericCrudRepository } from '@common/repositories/generic-crud.repository';
import { BloqueHoras } from './bloque-horas.model';

@Injectable()
export class BloqueHorasRepository extends GenericCrudRepository<BloqueHoras> {
  constructor(
    @InjectModel(BloqueHoras)
    model: typeof BloqueHoras,
  ) {
    super(model);
  }
}

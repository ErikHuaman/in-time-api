import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { GenericCrudRepository } from '@common/repositories/generic-crud.repository';
import { SeguroSalud } from './seguro-salud.model';

@Injectable()
export class SeguroSaludRepository extends GenericCrudRepository<SeguroSalud> {
  constructor(
    @InjectModel(SeguroSalud)
    model: typeof SeguroSalud,
  ) {
    super(model);
  }
}

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { GenericCrudRepository } from '@common/repositories/generic-crud.repository';
import { FrecuenciaPago } from './frecuencia-pago.model';

@Injectable()
export class FrecuenciaPagoRepository extends GenericCrudRepository<FrecuenciaPago> {
  constructor(
    @InjectModel(FrecuenciaPago)
    model: typeof FrecuenciaPago,
  ) {
    super(model);
  }
}

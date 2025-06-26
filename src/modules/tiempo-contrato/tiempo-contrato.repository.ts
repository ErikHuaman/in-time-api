import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { GenericCrudRepository } from '@common/repositories/generic-crud.repository';
import { TiempoContrato } from './tiempo-contrato.model';

@Injectable()
export class TiempoContratoRepository extends GenericCrudRepository<TiempoContrato> {
  constructor(
    @InjectModel(TiempoContrato)
    model: typeof TiempoContrato,
  ) {
    super(model);
  }
}

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { GenericCrudRepository } from '@common/repositories/generic-crud.repository';
import { BeneficioTrabajador } from './beneficio-trabajador.model';

@Injectable()
export class BeneficioTrabajadorRepository extends GenericCrudRepository<BeneficioTrabajador> {
  constructor(
    @InjectModel(BeneficioTrabajador)
    model: typeof BeneficioTrabajador,
  ) {
    super(model);
  }
}

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { GenericCrudRepository } from '@common/repositories/generic-crud.repository';
import { ContratoTrabajador } from './contrato-trabajador.model';

@Injectable()
export class ContratoTrabajadorRepository extends GenericCrudRepository<ContratoTrabajador> {
  constructor(
    @InjectModel(ContratoTrabajador)
    model: typeof ContratoTrabajador,
  ) {
    super(model);
  }
}

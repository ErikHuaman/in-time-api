import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { GenericCrudRepository } from '@common/repositories/generic-crud.repository';
import { InfoTrabajador } from './info-trabajador.model';

@Injectable()
export class InfoTrabajadorRepository extends GenericCrudRepository<InfoTrabajador> {
  constructor(
    @InjectModel(InfoTrabajador)
    model: typeof InfoTrabajador,
  ) {
    super(model);
  }
}

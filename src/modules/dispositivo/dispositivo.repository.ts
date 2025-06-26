import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { GenericCrudRepository } from '@common/repositories/generic-crud.repository';
import { Dispositivo } from './dispositivo.model';

@Injectable()
export class DispositivoRepository extends GenericCrudRepository<Dispositivo> {
  constructor(
    @InjectModel(Dispositivo)
    model: typeof Dispositivo,
  ) {
    super(model);
  }
}

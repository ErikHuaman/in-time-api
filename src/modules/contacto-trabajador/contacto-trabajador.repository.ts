import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { GenericCrudRepository } from '@common/repositories/generic-crud.repository';
import { ContactoTrabajador } from './contacto-trabajador.model';

@Injectable()
export class ContactoTrabajadorRepository extends GenericCrudRepository<ContactoTrabajador> {
  constructor(
    @InjectModel(ContactoTrabajador)
    model: typeof ContactoTrabajador,
  ) {
    super(model);
  }
}

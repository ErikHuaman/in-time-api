import { Module } from '@nestjs/common';
import { ContactoTrabajadorService } from './contacto-trabajador.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { ContactoTrabajador } from './contacto-trabajador.model';
import { ContactoTrabajadorRepository } from './contacto-trabajador.repository';

@Module({
  imports: [SequelizeModule.forFeature([ContactoTrabajador])],
  providers: [ContactoTrabajadorService, ContactoTrabajadorRepository],
  exports: [ContactoTrabajadorService, ContactoTrabajadorRepository],
})
export class ContactoTrabajadorModule {}

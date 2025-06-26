import { Module } from '@nestjs/common';
import { ContactoTrabajadorController } from './contacto-trabajador.controller';
import { ContactoTrabajadorService } from './contacto-trabajador.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { ContactoTrabajador } from './contacto-trabajador.model';
import { ContactoTrabajadorRepository } from './contacto-trabajador.repository';

@Module({
  imports: [SequelizeModule.forFeature([ContactoTrabajador])],
  controllers: [ContactoTrabajadorController],
  providers: [ContactoTrabajadorService, ContactoTrabajadorRepository],
  exports: [ContactoTrabajadorService, ContactoTrabajadorRepository],
})
export class ContactoTrabajadorModule {}

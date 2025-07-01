import { Module } from '@nestjs/common';
import { ControlTrabajadorService } from './control-trabajador.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { ControlTrabajador } from './control-trabajador.model';
import { ControlTrabajadorRepository } from './control-trabajador.repository';

@Module({
  imports: [SequelizeModule.forFeature([ControlTrabajador])],
  providers: [ControlTrabajadorService, ControlTrabajadorRepository],
  exports: [ControlTrabajadorService, ControlTrabajadorRepository],
})
export class ControlTrabajadorModule {}

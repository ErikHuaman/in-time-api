import { Module } from '@nestjs/common';
import { ControlTrabajadorController } from './control-trabajador.controller';
import { ControlTrabajadorService } from './control-trabajador.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { ControlTrabajador } from './control-trabajador.model';
import { ControlTrabajadorRepository } from './control-trabajador.repository';

@Module({
  imports: [SequelizeModule.forFeature([ControlTrabajador])],
  controllers: [ControlTrabajadorController],
  providers: [ControlTrabajadorService, ControlTrabajadorRepository],
  exports: [ControlTrabajadorService, ControlTrabajadorRepository],
})
export class ControlTrabajadorModule {}

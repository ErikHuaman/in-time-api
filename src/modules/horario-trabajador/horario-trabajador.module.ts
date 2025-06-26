import { Module } from '@nestjs/common';
import { HorarioTrabajadorController } from './horario-trabajador.controller';
import { HorarioTrabajadorService } from './horario-trabajador.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { HorarioTrabajador } from './horario-trabajador.model';
import { HorarioTrabajadorRepository } from './horario-trabajador.repository';

@Module({
  imports: [SequelizeModule.forFeature([HorarioTrabajador])],
  controllers: [HorarioTrabajadorController],
  providers: [HorarioTrabajadorService, HorarioTrabajadorRepository],
  exports: [HorarioTrabajadorService, HorarioTrabajadorRepository],
})
export class HorarioTrabajadorModule {}

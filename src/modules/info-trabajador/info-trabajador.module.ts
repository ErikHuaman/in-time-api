import { Module } from '@nestjs/common';
import { InfoTrabajadorService } from './info-trabajador.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { InfoTrabajador } from './info-trabajador.model';
import { InfoTrabajadorRepository } from './info-trabajador.repository';

@Module({
  imports: [SequelizeModule.forFeature([InfoTrabajador])],
  providers: [InfoTrabajadorService, InfoTrabajadorRepository],
  exports: [InfoTrabajadorService, InfoTrabajadorRepository],
})
export class InfoTrabajadorModule {}

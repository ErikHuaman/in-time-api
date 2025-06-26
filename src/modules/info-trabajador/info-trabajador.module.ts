import { Module } from '@nestjs/common';
import { InfoTrabajadorController } from './info-trabajador.controller';
import { InfoTrabajadorService } from './info-trabajador.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { InfoTrabajador } from './info-trabajador.model';
import { InfoTrabajadorRepository } from './info-trabajador.repository';

@Module({
  imports: [SequelizeModule.forFeature([InfoTrabajador])],
  controllers: [InfoTrabajadorController],
  providers: [InfoTrabajadorService, InfoTrabajadorRepository],
  exports: [InfoTrabajadorService, InfoTrabajadorRepository],
})
export class InfoTrabajadorModule {}

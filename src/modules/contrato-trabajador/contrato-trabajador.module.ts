import { Module } from '@nestjs/common';
import { ContratoTrabajadorService } from './contrato-trabajador.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { ContratoTrabajador } from './contrato-trabajador.model';
import { ContratoTrabajadorRepository } from './contrato-trabajador.repository';

@Module({
  imports: [SequelizeModule.forFeature([ContratoTrabajador])],
  providers: [ContratoTrabajadorService, ContratoTrabajadorRepository],
  exports: [ContratoTrabajadorService, ContratoTrabajadorRepository],
})
export class ContratoTrabajadorModule {}

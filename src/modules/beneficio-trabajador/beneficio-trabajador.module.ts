import { Module } from '@nestjs/common';
import { BeneficioTrabajadorService } from './beneficio-trabajador.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { BeneficioTrabajador } from './beneficio-trabajador.model';
import { BeneficioTrabajadorRepository } from './beneficio-trabajador.repository';

@Module({
  imports: [SequelizeModule.forFeature([BeneficioTrabajador])],
  providers: [BeneficioTrabajadorService, BeneficioTrabajadorRepository],
  exports: [BeneficioTrabajadorService, BeneficioTrabajadorRepository],
})
export class BeneficioTrabajadorModule {}

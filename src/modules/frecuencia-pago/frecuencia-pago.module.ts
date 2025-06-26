import { Module } from '@nestjs/common';
import { FrecuenciaPagoController } from './frecuencia-pago.controller';
import { FrecuenciaPagoService } from './frecuencia-pago.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { FrecuenciaPago } from './frecuencia-pago.model';
import { FrecuenciaPagoRepository } from './frecuencia-pago.repository';

@Module({
  imports: [SequelizeModule.forFeature([FrecuenciaPago])],
  controllers: [FrecuenciaPagoController],
  providers: [FrecuenciaPagoService, FrecuenciaPagoRepository],
  exports: [FrecuenciaPagoService, FrecuenciaPagoRepository],
})
export class FrecuenciaPagoModule {}

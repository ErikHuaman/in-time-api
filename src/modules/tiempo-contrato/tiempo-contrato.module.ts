import { Module } from '@nestjs/common';
import { TiempoContratoController } from './tiempo-contrato.controller';
import { TiempoContratoService } from './tiempo-contrato.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { TiempoContrato } from './tiempo-contrato.model';
import { TiempoContratoRepository } from './tiempo-contrato.repository';

@Module({
  imports: [SequelizeModule.forFeature([TiempoContrato])],
  controllers: [TiempoContratoController],
  providers: [TiempoContratoService, TiempoContratoRepository],
  exports: [TiempoContratoService, TiempoContratoRepository],
})
export class TiempoContratoModule {}

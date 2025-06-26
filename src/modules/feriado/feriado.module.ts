import { Module } from '@nestjs/common';
import { FeriadoController } from './feriado.controller';
import { FeriadoService } from './feriado.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Feriado } from './feriado.model';
import { FeriadoRepository } from './feriado.repository';

@Module({
  imports: [SequelizeModule.forFeature([Feriado])],
  controllers: [FeriadoController],
  providers: [FeriadoService, FeriadoRepository],
  exports: [FeriadoService, FeriadoRepository],
})
export class FeriadoModule {}

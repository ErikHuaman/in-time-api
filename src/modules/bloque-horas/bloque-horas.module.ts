import { Module } from '@nestjs/common';
import { BloqueHorasController } from './bloque-horas.controller';
import { BloqueHorasService } from './bloque-horas.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { BloqueHoras } from './bloque-horas.model';
import { BloqueHorasRepository } from './bloque-horas.repository';

@Module({
  imports: [SequelizeModule.forFeature([BloqueHoras])],
  controllers: [BloqueHorasController],
  providers: [BloqueHorasService, BloqueHorasRepository],
  exports: [BloqueHorasService, BloqueHorasRepository],
})
export class BloqueHorasModule {}

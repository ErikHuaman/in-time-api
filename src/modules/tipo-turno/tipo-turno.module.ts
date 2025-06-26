import { Module } from '@nestjs/common';
import { TipoTurnoController } from './tipo-turno.controller';
import { TipoTurnoService } from './tipo-turno.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { TipoTurno } from './tipo-turno.model';
import { TipoTurnoRepository } from './tipo-turno.repository';

@Module({
  imports: [SequelizeModule.forFeature([TipoTurno])],
  controllers: [TipoTurnoController],
  providers: [TipoTurnoService, TipoTurnoRepository],
  exports: [TipoTurnoService, TipoTurnoRepository],
})
export class TipoTurnoModule {}

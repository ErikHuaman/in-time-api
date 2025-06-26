import { Module } from '@nestjs/common';
import { TurnoTrabajoController } from './turno-trabajo.controller';
import { TurnoTrabajoService } from './turno-trabajo.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { TurnoTrabajo } from './turno-trabajo.model';
import { TurnoTrabajoRepository } from './turno-trabajo.repository';

@Module({
  imports: [SequelizeModule.forFeature([TurnoTrabajo])],
  controllers: [TurnoTrabajoController],
  providers: [TurnoTrabajoService, TurnoTrabajoRepository],
  exports: [TurnoTrabajoService, TurnoTrabajoRepository],
})
export class TurnoTrabajoModule {}

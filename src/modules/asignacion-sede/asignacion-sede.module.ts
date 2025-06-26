import { Module } from '@nestjs/common';
import { AsignacionSedeController } from './asignacion-sede.controller';
import { AsignacionSedeService } from './asignacion-sede.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { AsignacionSede } from './asignacion-sede.model';
import { AsignacionSedeRepository } from './asignacion-sede.repository';

@Module({
  imports: [SequelizeModule.forFeature([AsignacionSede])],
  controllers: [AsignacionSedeController],
  providers: [AsignacionSedeService, AsignacionSedeRepository],
  exports: [AsignacionSedeService, AsignacionSedeRepository],
})
export class AsignacionSedeModule {}

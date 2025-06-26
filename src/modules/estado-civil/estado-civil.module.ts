import { Module } from '@nestjs/common';
import { EstadoCivilController } from './estado-civil.controller';
import { EstadoCivilService } from './estado-civil.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { EstadoCivil } from './estado-civil.model';
import { EstadoCivilRepository } from './estado-civil.repository';

@Module({
  imports: [SequelizeModule.forFeature([EstadoCivil])],
  controllers: [EstadoCivilController],
  providers: [EstadoCivilService, EstadoCivilRepository],
  exports: [EstadoCivilService, EstadoCivilRepository],
})
export class EstadoCivilModule {}

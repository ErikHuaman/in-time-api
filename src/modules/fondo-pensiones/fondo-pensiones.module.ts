import { Module } from '@nestjs/common';
import { FondoPensionesController } from './fondo-pensiones.controller';
import { FondoPensionesService } from './fondo-pensiones.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { FondoPensiones } from './fondo-pensiones.model';
import { FondoPensionesRepository } from './fondo-pensiones.repository';

@Module({
  imports: [SequelizeModule.forFeature([FondoPensiones])],
  controllers: [FondoPensionesController],
  providers: [FondoPensionesService, FondoPensionesRepository],
  exports: [FondoPensionesService, FondoPensionesRepository],
})
export class FondoPensionesModule {}

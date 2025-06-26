import { Module } from '@nestjs/common';
import { VacacionController } from './vacacion.controller';
import { VacacionService } from './vacacion.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Vacacion } from './vacacion.model';
import { VacacionRepository } from './vacacion.repository';

@Module({
  imports: [SequelizeModule.forFeature([Vacacion])],
  controllers: [VacacionController],
  providers: [VacacionService, VacacionRepository],
  exports: [VacacionService, VacacionRepository],
})
export class VacacionModule {}

import { Module } from '@nestjs/common';
import { SeguroSaludController } from './seguro-salud.controller';
import { SeguroSaludService } from './seguro-salud.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { SeguroSalud } from './seguro-salud.model';
import { SeguroSaludRepository } from './seguro-salud.repository';

@Module({
  imports: [SequelizeModule.forFeature([SeguroSalud])],
  controllers: [SeguroSaludController],
  providers: [SeguroSaludService, SeguroSaludRepository],
  exports: [SeguroSaludService, SeguroSaludRepository]
})
export class SeguroSaludModule {}

import { Module } from '@nestjs/common';
import { ProvinciaController } from './provincia.controller';
import { ProvinciaService } from './provincia.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Provincia } from './provincia.model';

@Module({
  imports: [SequelizeModule.forFeature([Provincia])],
  controllers: [ProvinciaController],
  providers: [ProvinciaService]
})
export class ProvinciaModule {}

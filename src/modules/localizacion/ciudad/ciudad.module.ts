import { Module } from '@nestjs/common';
import { CiudadController } from './ciudad.controller';
import { CiudadService } from './ciudad.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Ciudad } from './ciudad.model';

@Module({
  imports: [SequelizeModule.forFeature([Ciudad])],
  controllers: [CiudadController],
  providers: [CiudadService],
})
export class CiudadModule {}

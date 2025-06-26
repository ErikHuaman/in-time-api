import { Module } from '@nestjs/common';
import { ModuloController } from './modulo.controller';
import { ModuloService } from './modulo.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Modulo } from './modulo.model';
import { ModuloRepository } from './modulo.repository';

@Module({
  imports: [SequelizeModule.forFeature([Modulo])],
  controllers: [ModuloController],
  providers: [ModuloService, ModuloRepository],
  exports: [ModuloService, ModuloRepository]
})
export class ModuloModule {}

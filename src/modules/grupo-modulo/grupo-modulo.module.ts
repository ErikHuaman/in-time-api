import { Module } from '@nestjs/common';
import { GrupoModuloController } from './grupo-modulo.controller';
import { GrupoModuloService } from './grupo-modulo.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { GrupoModulo } from './grupo-modulo.model';
import { GrupoModuloRepository } from './grupo-modulo.repository';

@Module({
  imports: [SequelizeModule.forFeature([GrupoModulo])],
  controllers: [GrupoModuloController],
  providers: [GrupoModuloService, GrupoModuloRepository],
  exports: [GrupoModuloService, GrupoModuloRepository],
})
export class GrupoModuloModule {}

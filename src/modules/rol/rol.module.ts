import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { RolController } from './rol.controller';
import { RolService } from './rol.service';
import { Rol } from './rol.model';
import { GrupoModuloModule } from '@modules/grupo-modulo/grupo-modulo.module';
import { RolRepository } from './rol.repository';

@Module({
  imports: [SequelizeModule.forFeature([Rol]), GrupoModuloModule],
  controllers: [RolController],
  providers: [RolService, RolRepository],
  exports: [RolService, RolRepository],
})
export class RolModule {}

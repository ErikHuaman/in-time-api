import { Module } from '@nestjs/common';
import { PermisoRolController } from './permiso-rol.controller';
import { PermisoRolService } from './permiso-rol.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { PermisoRol } from './permiso-rol.model';
import { PermisoRolRepository } from './permiso-rol.repository';

@Module({
  imports: [SequelizeModule.forFeature([PermisoRol])],
  controllers: [PermisoRolController],
  providers: [PermisoRolService, PermisoRolRepository],
  exports: [PermisoRolService, PermisoRolRepository],
})
export class PermisoRolModule {}

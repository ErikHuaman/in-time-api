import { Module } from '@nestjs/common';
import { PermisoTrabajadorController } from './permiso-trabajador.controller';
import { PermisoTrabajadorService } from './permiso-trabajador.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { PermisoTrabajador } from './permiso-trabajador.model';
import { PermisoTrabajadorRepository } from './permiso-trabajador.repository';

@Module({
  imports: [SequelizeModule.forFeature([PermisoTrabajador])],
  controllers: [PermisoTrabajadorController],
  providers: [PermisoTrabajadorService, PermisoTrabajadorRepository],
  exports: [PermisoTrabajadorService, PermisoTrabajadorRepository],
})
export class PermisoTrabajadorModule {}

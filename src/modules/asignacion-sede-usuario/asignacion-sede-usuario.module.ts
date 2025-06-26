import { Module } from '@nestjs/common';
import { AsignacionSedeUsuarioController } from './asignacion-sede-usuario.controller';
import { AsignacionSedeUsuarioService } from './asignacion-sede-usuario.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { AsignacionSedeUsuario } from './asignacion-sede-usuario.model';
import { AsignacionSedeUsuarioRepository } from './asignacion-sede-usuario.repository';

@Module({
  imports: [SequelizeModule.forFeature([AsignacionSedeUsuario])],
  controllers: [AsignacionSedeUsuarioController],
  providers: [AsignacionSedeUsuarioService, AsignacionSedeUsuarioRepository],
  exports: [AsignacionSedeUsuarioService, AsignacionSedeUsuarioRepository],
})
export class AsignacionSedeUsuarioModule {}

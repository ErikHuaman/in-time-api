import { Module } from '@nestjs/common';
import { AsistenciaUsuarioController } from './asistencia-usuario.controller';
import { AsistenciaUsuarioService } from './asistencia-usuario.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { AsistenciaUsuario } from './asistencia-usuario.model';
import { AsistenciaUsuarioRepository } from './asistencia-usuario.repository';

@Module({
  imports: [SequelizeModule.forFeature([AsistenciaUsuario])],
  controllers: [AsistenciaUsuarioController],
  providers: [AsistenciaUsuarioService, AsistenciaUsuarioRepository],
  exports: [AsistenciaUsuarioService, AsistenciaUsuarioRepository],
})
export class AsistenciaUsuarioModule {}

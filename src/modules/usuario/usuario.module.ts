import { forwardRef, Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { UsuarioController } from './usuario.controller';
import { UsuarioService } from './usuario.service';
import { Usuario } from './usuario.model';
import { FaceModule } from '@modules/face/face.module';
import { UsuarioRepository } from './usuario.repository';
import { AsignacionSedeUsuarioModule } from '@modules/asignacion-sede-usuario/asignacion-sede-usuario.module';

@Module({
  imports: [
    SequelizeModule.forFeature([Usuario]),
    forwardRef(() => FaceModule),
    AsignacionSedeUsuarioModule,
  ],
  controllers: [UsuarioController],
  providers: [UsuarioService, UsuarioRepository],
  exports: [UsuarioService, UsuarioRepository],
})
export class UsuarioModule {}

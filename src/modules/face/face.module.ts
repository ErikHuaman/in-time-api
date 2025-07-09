import { Module } from '@nestjs/common';
import { FaceService } from './face.service';
import { FaceController } from './face.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { RegistroBiometrico } from '@modules/registro-biometrico/registro-biometrico.model';
import { Asistencia } from '@modules/asistencia/asistencia.model';
import { AsistenciaUsuario } from '@modules/asistencia-usuario/asistencia-usuario.model';
import { Usuario } from '@modules/usuario/usuario.model';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    HttpModule,
    SequelizeModule.forFeature([RegistroBiometrico]),
    SequelizeModule.forFeature([Asistencia]),
    SequelizeModule.forFeature([AsistenciaUsuario]),
    SequelizeModule.forFeature([Usuario])
  ],
  providers: [FaceService],
  controllers: [FaceController],
  exports: [FaceService],
})
export class FaceModule {}

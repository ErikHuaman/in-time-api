import { Module } from '@nestjs/common';
import { RegistroBiometricoController } from './registro-biometrico.controller';
import { RegistroBiometricoService } from './registro-biometrico.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { RegistroBiometrico } from './registro-biometrico.model';
import { FaceModule } from '@modules/face/face.module';
import { RegistroBiometricoRepository } from './registro-biometrico.repository';

@Module({
  imports: [SequelizeModule.forFeature([RegistroBiometrico]), FaceModule],
  // controllers: [RegistroBiometricoController],
  providers: [RegistroBiometricoService, RegistroBiometricoRepository],
  exports: [RegistroBiometricoService, RegistroBiometricoRepository],
})
export class RegistroBiometricoModule {}

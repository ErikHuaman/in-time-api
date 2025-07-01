import { Module } from '@nestjs/common';
import { RegistroBiometricoService } from './registro-biometrico.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { RegistroBiometrico } from './registro-biometrico.model';
import { RegistroBiometricoRepository } from './registro-biometrico.repository';

@Module({
  imports: [SequelizeModule.forFeature([RegistroBiometrico])],
  providers: [RegistroBiometricoService, RegistroBiometricoRepository],
  exports: [RegistroBiometricoService, RegistroBiometricoRepository],
})
export class RegistroBiometricoModule {}

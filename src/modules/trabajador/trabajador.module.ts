import { Module } from '@nestjs/common';
import { TrabajadorController } from './trabajador.controller';
import { TrabajadorService } from './trabajador.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Trabajador } from './trabajador.model';
import { TrabajadorRepository } from './trabajador.repository';
import { ContratoTrabajadorModule } from '@modules/contrato-trabajador/contrato-trabajador.module';
import { ContactoTrabajadorModule } from '@modules/contacto-trabajador/contacto-trabajador.module';
import { InfoTrabajadorModule } from '@modules/info-trabajador/info-trabajador.module';
import { RegistroBiometricoModule } from '@modules/registro-biometrico/registro-biometrico.module';
import { ControlTrabajadorModule } from '@modules/control-trabajador/control-trabajador.module';
import { BeneficioTrabajadorModule } from '@modules/beneficio-trabajador/beneficio-trabajador.module';
import { AsignacionSedeModule } from '@modules/asignacion-sede/asignacion-sede.module';
import { FaceModule } from '@modules/face/face.module';
import { InactivacionTrabajadorModule } from '@modules/inactivacion-trabajador/inactivacion-trabajador.module';

@Module({
  imports: [
    SequelizeModule.forFeature([Trabajador]),
    ContratoTrabajadorModule,
    ControlTrabajadorModule,
    RegistroBiometricoModule,
    InfoTrabajadorModule,
    ContactoTrabajadorModule,
    BeneficioTrabajadorModule,
    AsignacionSedeModule,
    FaceModule,
    InactivacionTrabajadorModule
  ],
  controllers: [TrabajadorController],
  providers: [TrabajadorService, TrabajadorRepository],
  exports: [TrabajadorService, TrabajadorRepository],
})
export class TrabajadorModule {}

import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SedeModule } from '@modules/sede/sede.module';
import { CargoModule } from '@modules/cargo/cargo.module';
import { PaisModule } from '@modules/localizacion/pais/pais.module';
import { RegionModule } from '@modules/localizacion/region/region.module';
import { ProvinciaModule } from '@modules/localizacion/provincia/provincia.module';
import { CiudadModule } from '@modules/localizacion/ciudad/ciudad.module';
import { ParametroModule } from '@modules/parametro/parametro.module';
import { TipoDocIdentModule } from '@modules/tipo-doc-ident/tipo-doc-ident.module';
import { FrecuenciaPagoModule } from '@modules/frecuencia-pago/frecuencia-pago.module';
import { TiempoContratoModule } from '@modules/tiempo-contrato/tiempo-contrato.module';
import { TrabajadorModule } from '@modules/trabajador/trabajador.module';
import { InfoTrabajadorModule } from '@modules/info-trabajador/info-trabajador.module';
import { ContratoTrabajadorModule } from '@modules/contrato-trabajador/contrato-trabajador.module';
import { RegistroBiometricoModule } from '@modules/registro-biometrico/registro-biometrico.module';
import { ContactoTrabajadorModule } from '@modules/contacto-trabajador/contacto-trabajador.module';
import { BeneficioTrabajadorModule } from '@modules/beneficio-trabajador/beneficio-trabajador.module';
import { ControlTrabajadorModule } from '@modules/control-trabajador/control-trabajador.module';
import { EstadoCivilModule } from '@modules/estado-civil/estado-civil.module';
import { TurnoTrabajoModule } from '@modules/turno-trabajo/turno-trabajo.module';
import { AsignacionSedeModule } from '@modules/asignacion-sede/asignacion-sede.module';
import { PermisoTrabajadorModule } from '@modules/permiso-trabajador/permiso-trabajador.module';
import { VacacionModule } from '@modules/vacacion/vacacion.module';
import { InactivacionTrabajadorModule } from '@modules/inactivacion-trabajador/inactivacion-trabajador.module';
import { BloqueHorasModule } from '@modules/bloque-horas/bloque-horas.module';
import { PatronHorarioModule } from '@modules/patron-horario/patron-horario.module';
import { HorarioTrabajadorModule } from '@modules/horario-trabajador/horario-trabajador.module';
import { AsistenciaModule } from '@modules/asistencia/asistencia.module';
import { MarcacionAsistenciaModule } from '@modules/marcacion-asistencia/marcacion-asistencia.module';
import { TipoTurnoModule } from '@modules/tipo-turno/tipo-turno.module';
import { HorarioTrabajadorItemModule } from '@modules/horario-trabajador-item/horario-trabajador-item.module';
import { PatronHorarioItemModule } from '@modules/patron-horario-item/patron-horario-item.module';
import { AdelantoModule } from '@modules/adelanto/adelanto.module';
import { DispositivoModule } from '@modules/dispositivo/dispositivo.module';
import { FeriadoModule } from '@modules/feriado/feriado.module';
import { FaceModule } from '@modules/face/face.module';
import { RolModule } from '@modules/rol/rol.module';
import { UsuarioModule } from '@modules/usuario/usuario.module';
import { DatabaseModule } from '@core/database/database.module';
import { FondoPensionesModule } from '@modules/fondo-pensiones/fondo-pensiones.module';
import { SeguroSaludModule } from '@modules/seguro-salud/seguro-salud.module';
import { PermisoRolModule } from './modules/permiso-rol/permiso-rol.module';
import { ModuloModule } from './modules/modulo/modulo.module';
import { GrupoModuloModule } from './modules/grupo-modulo/grupo-modulo.module';
import { AsignacionSedeUsuarioModule } from './modules/asignacion-sede-usuario/asignacion-sede-usuario.module';
import { ReemplazoHorarioModule } from './modules/reemplazo-horario/reemplazo-horario.module';
import { EstadoAsistenciaModule } from './modules/estado-asistencia/estado-asistencia.module';
import { JustificacionInasistenciaModule } from './modules/justificacion-inasistencia/justificacion-inasistencia.module';
import { CorreccionMarcacionModule } from './modules/correccion-marcacion/correccion-marcacion.module';
import { ReemplaceroModule } from './modules/reemplacero/reemplacero.module';
import { AsistenciaUsuarioModule } from './modules/asistencia-usuario/asistencia-usuario.module';
import { AlertaModule } from './modules/alerta/alerta.module';
import { ScheduleModule } from '@nestjs/schedule';
import { MailModule } from './core/mail/mail.module';
import { BullModule } from '@nestjs/bull';
import { AuthModule } from '@core/auth/auth.module';
import { PdfModule } from './core/pdf/pdf.module';
import { SedeParametroModule } from './modules/sede-parametro/sede-parametro.module';
import { FirebaseModule } from './core/firebase/firebase.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env' }),
    ScheduleModule.forRoot(),
    BullModule.forRoot({
      redis: {
        host: 'localhost',
        port: 6379,
      },
    }),
    DatabaseModule,
    AuthModule,
    PaisModule,
    RegionModule,
    ProvinciaModule,
    CiudadModule,
    RolModule,
    UsuarioModule,
    GrupoModuloModule,
    ModuloModule,
    PermisoRolModule,
    SedeModule,
    CargoModule,
    ParametroModule,
    TipoDocIdentModule,
    FrecuenciaPagoModule,
    TiempoContratoModule,
    TrabajadorModule,
    InfoTrabajadorModule,
    ContratoTrabajadorModule,
    RegistroBiometricoModule,
    ContactoTrabajadorModule,
    BeneficioTrabajadorModule,
    ControlTrabajadorModule,
    EstadoCivilModule,
    TurnoTrabajoModule,
    AsignacionSedeModule,
    PermisoTrabajadorModule,
    VacacionModule,
    InactivacionTrabajadorModule,
    BloqueHorasModule,
    PatronHorarioModule,
    HorarioTrabajadorModule,
    MarcacionAsistenciaModule,
    TipoTurnoModule,
    HorarioTrabajadorItemModule,
    PatronHorarioItemModule,
    AdelantoModule,
    DispositivoModule,
    AsistenciaModule,
    FeriadoModule,
    FaceModule,
    FondoPensionesModule,
    SeguroSaludModule,
    AsignacionSedeUsuarioModule,
    ReemplazoHorarioModule,
    EstadoAsistenciaModule,
    JustificacionInasistenciaModule,
    CorreccionMarcacionModule,
    ReemplaceroModule,
    AsistenciaUsuarioModule,
    AlertaModule,
    MailModule,
    PdfModule,
    SedeParametroModule,
    FirebaseModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

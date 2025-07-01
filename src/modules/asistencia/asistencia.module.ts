import { Module } from '@nestjs/common';
import { AsistenciaController } from './asistencia.controller';
import { AsistenciaService } from './asistencia.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Asistencia } from './asistencia.model';
import { TrabajadorModule } from '@modules/trabajador/trabajador.module';
import { MailModule } from '@core/mail/mail.module';
import { PdfModule } from '@core/pdf/pdf.module';
import { AsistenciaRepository } from './asistencia.repository';
import { UsuarioModule } from '@modules/usuario/usuario.module';

@Module({
  imports: [
    SequelizeModule.forFeature([Asistencia]),
    TrabajadorModule,
    UsuarioModule,
    MailModule,
    PdfModule
  ],
  controllers: [AsistenciaController],
  providers: [AsistenciaService, AsistenciaRepository],
  exports: [AsistenciaService, AsistenciaRepository],
})
export class AsistenciaModule {}

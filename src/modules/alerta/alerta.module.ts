import { Module } from '@nestjs/common';
import { AlertaController } from './alerta.controller';
import { AlertaService } from './alerta.service';
import { AlertaGateway } from './alerta.gateway';
import { SequelizeModule } from '@nestjs/sequelize';
import { Alerta } from './alerta.model';
import { AsistenciaModule } from '@modules/asistencia/asistencia.module';
import { SedeModule } from '@modules/sede/sede.module';
import { AlertaRepository } from './alerta.repository';

@Module({
  imports: [SequelizeModule.forFeature([Alerta]), AsistenciaModule, SedeModule],
  controllers: [AlertaController],
  providers: [AlertaService, AlertaGateway, AlertaRepository],
  exports: [AlertaService, AlertaRepository],
})
export class AlertaModule {}

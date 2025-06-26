import { Module } from '@nestjs/common';
import { JustificacionInasistenciaController } from './justificacion-inasistencia.controller';
import { JustificacionInasistenciaService } from './justificacion-inasistencia.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { JustificacionInasistencia } from './justificacion-inasistencia.model';
import { JustificacionInasistenciaRepository } from './justificacion-inasistencia.repository';

@Module({
  imports: [SequelizeModule.forFeature([JustificacionInasistencia])],
  controllers: [JustificacionInasistenciaController],
  providers: [JustificacionInasistenciaService, JustificacionInasistenciaRepository],
  exports: [JustificacionInasistenciaService, JustificacionInasistenciaRepository],
})
export class JustificacionInasistenciaModule {}

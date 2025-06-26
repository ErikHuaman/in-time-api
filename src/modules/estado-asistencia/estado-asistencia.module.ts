import { Module } from '@nestjs/common';
import { EstadoAsistenciaController } from './estado-asistencia.controller';
import { EstadoAsistenciaService } from './estado-asistencia.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { EstadoAsistencia } from './estado-asistencia.model';
import { EstadoAsistenciaRepository } from './estado-asistencia.repository';

@Module({
  imports: [SequelizeModule.forFeature([EstadoAsistencia])],
  controllers: [EstadoAsistenciaController],
  providers: [EstadoAsistenciaService, EstadoAsistenciaRepository],
  exports: [EstadoAsistenciaService, EstadoAsistenciaRepository],
})
export class EstadoAsistenciaModule {}

import { Module } from '@nestjs/common';
import { MarcacionAsistenciaController } from './marcacion-asistencia.controller';
import { MarcacionAsistenciaService } from './marcacion-asistencia.service';

@Module({
  controllers: [MarcacionAsistenciaController],
  providers: [MarcacionAsistenciaService]
})
export class MarcacionAsistenciaModule {}

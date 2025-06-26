import { Module } from '@nestjs/common';
import { CorreccionMarcacionController } from './correccion-marcacion.controller';
import { CorreccionMarcacionService } from './correccion-marcacion.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { CorreccionMarcacion } from './correccion-marcacion.model';
import { CorreccionMarcacionRepository } from './correccion-marcacion.repository';

@Module({
  imports: [SequelizeModule.forFeature([CorreccionMarcacion])],
  controllers: [CorreccionMarcacionController],
  providers: [CorreccionMarcacionService, CorreccionMarcacionRepository],
  exports: [CorreccionMarcacionService, CorreccionMarcacionRepository],
})
export class CorreccionMarcacionModule {}

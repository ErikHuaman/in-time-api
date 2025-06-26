import { Module } from '@nestjs/common';
import { ParametroController } from './parametro.controller';
import { ParametroService } from './parametro.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Parametro } from './parametro.model';
import { ParametroRepository } from './parametro.repository';

@Module({
  imports: [SequelizeModule.forFeature([Parametro])],
  controllers: [ParametroController],
  providers: [ParametroService, ParametroRepository],
  exports: [ParametroService, ParametroRepository],
})
export class ParametroModule {}

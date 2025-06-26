import { Module } from '@nestjs/common';
import { AdelantoController } from './adelanto.controller';
import { AdelantoService } from './adelanto.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Adelanto } from './adelanto.model';
import { AdelantoRepository } from './adelanto.repository';

@Module({
  imports: [SequelizeModule.forFeature([Adelanto])],
  controllers: [AdelantoController],
  providers: [AdelantoService, AdelantoRepository],
  exports: [AdelantoService, AdelantoRepository],
})
export class AdelantoModule {}

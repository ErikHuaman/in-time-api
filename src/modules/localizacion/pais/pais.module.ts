import { SequelizeModule } from '@nestjs/sequelize';
import { Module } from '@nestjs/common';
import { PaisController } from './pais.controller';
import { PaisService } from './pais.service';
import { Pais } from './pais.model';

@Module({
  imports: [SequelizeModule.forFeature([Pais])],
  controllers: [PaisController],
  providers: [PaisService],
})
export class PaisModule {}

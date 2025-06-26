import { Module } from '@nestjs/common';
import { CargoController } from './cargo.controller';
import { CargoService } from './cargo.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Cargo } from './cargo.model';
import { CargoRepository } from './cargo.repository';

@Module({
  imports: [SequelizeModule.forFeature([Cargo])],
  controllers: [CargoController],
  providers: [CargoService, CargoRepository],
})
export class CargoModule {}

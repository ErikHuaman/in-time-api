import { SequelizeModule } from '@nestjs/sequelize';
import { Module } from '@nestjs/common';
import { RegionController } from './region.controller';
import { RegionService } from './region.service';
import { Region } from './region.model';

@Module({
  imports: [SequelizeModule.forFeature([Region])],
  controllers: [RegionController],
  providers: [RegionService]
})
export class RegionModule {}

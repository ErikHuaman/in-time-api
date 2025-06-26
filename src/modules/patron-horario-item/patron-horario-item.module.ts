import { Module } from '@nestjs/common';
import { PatronHorarioItemController } from './patron-horario-item.controller';
import { PatronHorarioItemService } from './patron-horario-item.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { PatronHorarioItem } from './patron-horario-item.model';
import { PatronHorarioItemRepository } from './patron-horario-item.repository';

@Module({
  imports: [SequelizeModule.forFeature([PatronHorarioItem])],
  controllers: [PatronHorarioItemController],
  providers: [PatronHorarioItemService, PatronHorarioItemRepository],
  exports: [PatronHorarioItemService, PatronHorarioItemRepository],
})
export class PatronHorarioItemModule {}

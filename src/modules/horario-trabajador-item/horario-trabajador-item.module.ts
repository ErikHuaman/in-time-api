import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { HorarioTrabajadorItemController } from './horario-trabajador-item.controller';
import { HorarioTrabajadorItemService } from './horario-trabajador-item.service';
import { HorarioTrabajadorItem } from './horario-trabajador-item.model';
import { BloqueHorasModule } from '@modules/bloque-horas/bloque-horas.module';
import { HorarioTrabajadorItemRepository } from './horario-trabajador-item.repository';

@Module({
  imports: [
    SequelizeModule.forFeature([HorarioTrabajadorItem]),
    BloqueHorasModule,
  ],
  controllers: [HorarioTrabajadorItemController],
  providers: [HorarioTrabajadorItemService, HorarioTrabajadorItemRepository],
  exports: [HorarioTrabajadorItemService, HorarioTrabajadorItemRepository],
})
export class HorarioTrabajadorItemModule {}

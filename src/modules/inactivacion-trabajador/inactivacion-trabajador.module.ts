import { Module } from '@nestjs/common';
import { InactivacionTrabajadorController } from './inactivacion-trabajador.controller';
import { InactivacionTrabajadorService } from './inactivacion-trabajador.service';
import { InactivacionTrabajador } from './inactivacion-trabajador.model';
import { SequelizeModule } from '@nestjs/sequelize';
import { InactivacionTrabajadorRepository } from './inactivacion-trabajador.repository';

@Module({
  imports: [SequelizeModule.forFeature([InactivacionTrabajador])],
  controllers: [InactivacionTrabajadorController],
  providers: [InactivacionTrabajadorService, InactivacionTrabajadorRepository],
  exports: [InactivacionTrabajadorService, InactivacionTrabajadorRepository],
})
export class InactivacionTrabajadorModule {}

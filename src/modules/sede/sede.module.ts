import { Module } from '@nestjs/common';
import { SedeController } from './sede.controller';
import { SedeService } from './sede.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Sede } from './sede.model';
import { AsignacionSedeUsuarioModule } from '@modules/asignacion-sede-usuario/asignacion-sede-usuario.module';
import { SedeRepository } from './sede.repository';

@Module({
  imports: [SequelizeModule.forFeature([Sede]), AsignacionSedeUsuarioModule],
  controllers: [SedeController],
  providers: [SedeService, SedeRepository],
  exports: [SedeService, SedeRepository],
})
export class SedeModule {}

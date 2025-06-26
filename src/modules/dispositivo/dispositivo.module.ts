import { Module } from '@nestjs/common';
import { DispositivoController } from './dispositivo.controller';
import { DispositivoService } from './dispositivo.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Dispositivo } from './dispositivo.model';
import { TrabajadorModule } from '@modules/trabajador/trabajador.module';
import { UsuarioModule } from '@modules/usuario/usuario.module';
import { DispositivoRepository } from './dispositivo.repository';

@Module({
  imports: [
    SequelizeModule.forFeature([Dispositivo]),
    TrabajadorModule,
    UsuarioModule,
  ],
  controllers: [DispositivoController],
  providers: [DispositivoService, DispositivoRepository],
  exports: [DispositivoService, DispositivoRepository],
})
export class DispositivoModule {}

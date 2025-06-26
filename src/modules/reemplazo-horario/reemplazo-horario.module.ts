import { Module } from '@nestjs/common';
import { ReemplazoHorarioController } from './reemplazo-horario.controller';
import { ReemplazoHorarioService } from './reemplazo-horario.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { ReemplazoHorario } from './reemplazo-horario.model';
import { ReemplazoHorarioRepository } from './reemplazo-horario.repository';

@Module({
  imports: [SequelizeModule.forFeature([ReemplazoHorario])],
  controllers: [ReemplazoHorarioController],
  providers: [ReemplazoHorarioService, ReemplazoHorarioRepository],
  exports: [ReemplazoHorarioService, ReemplazoHorarioRepository],
})
export class ReemplazoHorarioModule {}

import { Module } from '@nestjs/common';
import { PatronHorarioController } from './patron-horario.controller';
import { PatronHorarioService } from './patron-horario.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { PatronHorario } from './patron-horario.model';
import { PatronHorarioRepository } from './patron-horario.repository';

@Module({
  imports: [SequelizeModule.forFeature([PatronHorario])],
  controllers: [PatronHorarioController],
  providers: [PatronHorarioService, PatronHorarioRepository],
  exports: [PatronHorarioService, PatronHorarioRepository],
})
export class PatronHorarioModule {}

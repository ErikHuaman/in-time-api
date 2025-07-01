import { forwardRef, Module } from '@nestjs/common';
import { ReemplaceroController } from './reemplacero.controller';
import { ReemplaceroService } from './reemplacero.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Reemplacero } from './reemplacero.model';
import { FaceModule } from '@modules/face/face.module';
import { ReemplaceroRepository } from './reemplacero.repository';

@Module({
  imports: [
    SequelizeModule.forFeature([Reemplacero]),
    forwardRef(() => FaceModule),
  ],
  controllers: [ReemplaceroController],
  providers: [ReemplaceroService, ReemplaceroRepository],
  exports: [ReemplaceroService, ReemplaceroRepository],
})
export class ReemplaceroModule {}

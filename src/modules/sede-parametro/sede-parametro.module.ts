import { Module } from '@nestjs/common';
import { SedeParametroController } from './sede-parametro.controller';
import { SedeParametroService } from './sede-parametro.service';

@Module({
  controllers: [SedeParametroController],
  providers: [SedeParametroService]
})
export class SedeParametroModule {}

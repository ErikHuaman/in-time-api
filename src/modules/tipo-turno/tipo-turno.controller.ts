import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { TipoTurnoService } from './tipo-turno.service';
import { TipoTurno } from './tipo-turno.model';
import { TipoTurnoDTO } from './tipo-turno.dto';
import { ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '@core/auth/jwt.guard';
import { PaginatedResponse } from '@common/interfaces/paginated-response.interface';

@Controller('tipoTurnos')
export class TipoTurnoController {
  constructor(private readonly service: TipoTurnoService) {}

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get()
  findAll(): Promise<PaginatedResponse<TipoTurno>> {
    return this.service.findAll();
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() dto: TipoTurnoDTO): Promise<TipoTurno | null> {
    return this.service.create(dto);
  }
}

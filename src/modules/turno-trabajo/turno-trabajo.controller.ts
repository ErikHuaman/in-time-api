import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { TurnoTrabajoService } from './turno-trabajo.service';
import { TurnoTrabajo } from './turno-trabajo.model';
import { TurnoTrabajoDTO } from './turno-trabajo.dto';
import { PaginatedResponse } from '@common/interfaces/paginated-response.interface';
import { ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '@core/auth/jwt.guard';

@Controller('turnosTrabajo')
export class TurnoTrabajoController {
  constructor(private readonly service: TurnoTrabajoService) {}

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get()
  findAll(): Promise<PaginatedResponse<TurnoTrabajo>> {
    return this.service.findAll();
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() dto: TurnoTrabajoDTO): Promise<TurnoTrabajo | null> {
    return this.service.create(dto);
  }
}

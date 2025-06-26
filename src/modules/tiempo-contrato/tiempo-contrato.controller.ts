import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { TiempoContratoService } from './tiempo-contrato.service';
import { TiempoContrato } from './tiempo-contrato.model';
import { TiempoContratoDTO } from './tiempo-contrato.dto';
import { PaginatedResponse } from '@common/interfaces/paginated-response.interface';
import { ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '@core/auth/jwt.guard';

@Controller('tiempoContrato')
export class TiempoContratoController {
  constructor(private readonly service: TiempoContratoService) {}

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get()
  findAll(): Promise<PaginatedResponse<TiempoContrato>> {
    return this.service.findAll();
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() dto: TiempoContratoDTO): Promise<TiempoContrato | null> {
    return this.service.create(dto);
  }
}

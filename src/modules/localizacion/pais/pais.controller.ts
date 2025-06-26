import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { Pais } from './pais.model';
import { PaisService } from './pais.service';
import { PaisDTO } from './pais.dto';
import { ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '@core/auth/jwt.guard';

@Controller('paises')
export class PaisController {
  constructor(private readonly service: PaisService) {}

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get()
  findAll(): Promise<Pais[]> {
    return this.service.findAll();
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get(':iso')
  findOne(@Param('iso') iso: string): Promise<Pais | null> {
    return this.service.findOne(iso);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() dto: PaisDTO): Promise<Pais | null> {
    return this.service.create(dto);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post('multiple')
  createMany(@Body() list: PaisDTO[]): Promise<Pais[]> {
    return this.service.createMany(list);
  }
}

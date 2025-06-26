import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ProvinciaService } from './provincia.service';
import { Provincia } from './provincia.model';
import { ProvinciaDTO } from './provincia.dto';
import { ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '@core/auth/jwt.guard';

@Controller('provincias')
export class ProvinciaController {
  constructor(private readonly service: ProvinciaService) {}

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get()
  findAll(): Promise<Provincia[]> {
    return this.service.findAll();
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string): Promise<Provincia | null> {
    return this.service.findOne(id);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get('byRegion/:idRegion')
  findByState(@Param('idRegion') idRegion: string): Promise<Provincia[]> {
    return this.service.findByState(idRegion);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() dto: ProvinciaDTO): Promise<Provincia | null> {
    return this.service.create(dto);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post('multiple')
  createMany(@Body() list: ProvinciaDTO[]): Promise<Provincia[]> {
    return this.service.createMany(list);
  }
}

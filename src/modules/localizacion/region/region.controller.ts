import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { RegionService } from './region.service';
import { Region } from './region.model';
import { RegionDTO } from './region.dto';
import { ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '@core/auth/jwt.guard';

@Controller('regiones')
export class RegionController {
  constructor(private readonly service: RegionService) {}

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get()
  findAll(): Promise<Region[]> {
    return this.service.findAll();
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string): Promise<Region | null> {
    return this.service.findOne(id);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get('byPais/:idPais')
  findByCountry(@Param('idPais') idPais: string): Promise<Region[]> {
    return this.service.findByCountry(idPais);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() dto: RegionDTO): Promise<Region | null> {
    return this.service.create(dto);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post('multiple')
  createMany(@Body() list: RegionDTO[]): Promise<Region[]> {
    return this.service.createMany(list);
  }
}

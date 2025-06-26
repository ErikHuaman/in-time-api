import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { CiudadService } from './ciudad.service';
import { Ciudad } from './ciudad.model';
import { CiudadDTO } from './ciudad.dto';
import { ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '@core/auth/jwt.guard';

@Controller('ciudades')
export class CiudadController {
  constructor(private readonly service: CiudadService) {}

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get()
  findAll(): Promise<Ciudad[]> {
    return this.service.findAll();
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string): Promise<Ciudad | null> {
    return this.service.findOne(id);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get('byProvincia/:idProvincia')
  findByProvince(@Param('idProvincia') idProvincia: string): Promise<Ciudad[]> {
    return this.service.findByProvince(idProvincia);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() dto: CiudadDTO): Promise<Ciudad | null> {
    return this.service.create(dto);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post('multiple')
  createMany(@Body() list: CiudadDTO[]): Promise<Ciudad[]> {
    return this.service.createMany(list);
  }
}

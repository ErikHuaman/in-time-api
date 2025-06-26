import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { SeguroSalud } from './seguro-salud.model';
import { SeguroSaludService } from './seguro-salud.service';
import { SeguroSaludDTO } from './seguro-salud.dto';
import { ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '@core/auth/jwt.guard';
import { PaginatedResponse } from '@common/interfaces/paginated-response.interface';

@Controller('seguroSalud')
export class SeguroSaludController {
  constructor(private readonly service: SeguroSaludService) {}

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get()
  findAll(): Promise<PaginatedResponse<SeguroSalud>> {
    return this.service.findAll();
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() dto: SeguroSaludDTO): Promise<SeguroSalud | null> {
    return this.service.create(dto);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() dto: SeguroSaludDTO,
  ): Promise<[number, SeguroSalud[]]> {
    return this.service.update(id, dto);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post('multiple')
  updateMany(@Body() list: SeguroSaludDTO[]): Promise<boolean> {
    return this.service.updateMany(list);
  }
}

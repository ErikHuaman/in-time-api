import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { TipoDocIdentService } from './tipo-doc-ident.service';
import { TipoDocIdent } from './tipo-doc-ident.model';
import { TipoDocIdentDTO } from './tipo-doc-ident.dto';
import { ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '@core/auth/jwt.guard';
import { PaginatedResponse } from '@common/interfaces/paginated-response.interface';

@Controller('tipoDocIdentificacion')
export class TipoDocIdentController {
  constructor(private readonly service: TipoDocIdentService) {}

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get()
  findAll(): Promise<PaginatedResponse<TipoDocIdent>> {
    return this.service.findAll();
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() dto: TipoDocIdentDTO): Promise<TipoDocIdent | null> {
    return this.service.create(dto);
  }
}

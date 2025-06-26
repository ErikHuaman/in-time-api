import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { FrecuenciaPagoService } from './frecuencia-pago.service';
import { FrecuenciaPago } from './frecuencia-pago.model';
import { FrecuenciaPagoDTO } from './frecuencia-pago.dto';
import { ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '@core/auth/jwt.guard';
import { CurrentUser } from '@common/decorators/current-user.decorator';
import { Usuario } from '@modules/usuario/usuario.model';
import { PaginationQueryDto } from '@common/dto/pagination-query.dto';
import { PaginatedResponse } from '@common/interfaces/paginated-response.interface';

@Controller('frecuenciaPago')
export class FrecuenciaPagoController {
  constructor(private readonly service: FrecuenciaPagoService) {}

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get()
  findAll(
    @CurrentUser() user: Usuario,
    @Query() query: PaginationQueryDto,
  ): Promise<PaginatedResponse<FrecuenciaPago>> {
    return this.service.findAll(
      user,
      query.limit!,
      query.offset!,
      query.q?.filter,
      query.q?.search,
    );
  }

  @Post()
  create(@Body() dto: FrecuenciaPagoDTO): Promise<FrecuenciaPago | null> {
    return this.service.create(dto);
  }
}

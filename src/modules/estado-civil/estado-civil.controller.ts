import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { EstadoCivilService } from './estado-civil.service';
import { EstadoCivil } from './estado-civil.model';
import { EstadoCivilDTO } from './estado-civil.dto';
import { ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '@core/auth/jwt.guard';
import { CurrentUser } from '@common/decorators/current-user.decorator';
import { Usuario } from '@modules/usuario/usuario.model';
import { PaginationQueryDto } from '@common/dto/pagination-query.dto';
import { PaginatedResponse } from '@common/interfaces/paginated-response.interface';

@Controller('estadosCiviles')
export class EstadoCivilController {
  constructor(private readonly service: EstadoCivilService) {}

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get()
  findAll(
    @CurrentUser() user: Usuario,
    @Query() query: PaginationQueryDto,
  ): Promise<PaginatedResponse<EstadoCivil>> {
    return this.service.findAll(
      user,
      query.limit!,
      query.offset!,
      query.q?.filter,
      query.q?.search,
    );
  }

  @Post()
  create(@Body() dto: EstadoCivilDTO): Promise<EstadoCivil | null> {
    return this.service.create(dto);
  }
}

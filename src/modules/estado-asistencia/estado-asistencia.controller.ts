import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { EstadoAsistenciaService } from './estado-asistencia.service';
import { EstadoAsistencia } from './estado-asistencia.model';
import { EstadoAsistenciaDTO } from './estado-asistencia.dto';
import { ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '@core/auth/jwt.guard';
import { CurrentUser } from '@common/decorators/current-user.decorator';
import { Usuario } from '@modules/usuario/usuario.model';
import { PaginationQueryDto } from '@common/dto/pagination-query.dto';
import { PaginatedResponse } from '@common/interfaces/paginated-response.interface';

@Controller('estadoAsistencias')
export class EstadoAsistenciaController {
  constructor(private readonly service: EstadoAsistenciaService) {}

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get()
  findAll(
    @CurrentUser() user: Usuario,
    @Query() query: PaginationQueryDto,
  ): Promise<PaginatedResponse<EstadoAsistencia>> {
    return this.service.findAll(
      user,
      query.limit!,
      query.offset!,
      query.q?.filter,
      query.q?.search,
    );
  }

  @Post()
  create(@Body() dto: EstadoAsistenciaDTO): Promise<EstadoAsistencia | null> {
    return this.service.create(dto);
  }
}

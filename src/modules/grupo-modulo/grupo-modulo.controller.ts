import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Patch,
  Query,
  UseGuards,
} from '@nestjs/common';
import { GrupoModuloService } from './grupo-modulo.service';
import { GrupoModulo } from './grupo-modulo.model';
import { GrupoModuloDTO } from './grupo-modulo.dto';
import { JwtAuthGuard } from '@core/auth/jwt.guard';
import { CurrentUser } from '@common/decorators/current-user.decorator';
import { ApiBearerAuth } from '@nestjs/swagger';
import { Usuario } from '@modules/usuario/usuario.model';
import { PaginationQueryDto } from '@common/dto/pagination-query.dto';
import { PaginatedResponse } from '@common/interfaces/paginated-response.interface';

@Controller('grupoModulos')
export class GrupoModuloController {
  constructor(private readonly service: GrupoModuloService) {}

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get()
  findAll(
    @CurrentUser() user: Usuario,
    @Query() query: PaginationQueryDto,
  ): Promise<PaginatedResponse<GrupoModulo>> {
    return this.service.findAll(
      user,
      query.limit!,
      query.offset!,
      query.q?.filter,
      query.q?.search,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Get('permisos')
  findAllPermisos(@CurrentUser() user: Usuario): Promise<GrupoModulo[]> {
    return this.service.findAllPermisos(user?.id);
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<GrupoModulo | null> {
    return this.service.findOne(id);
  }

  @Post()
  create(@Body() dto: GrupoModuloDTO): Promise<GrupoModulo | null> {
    return this.service.create(dto);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() dto: GrupoModuloDTO,
  ): Promise<[number, GrupoModulo[]]> {
    return this.service.update(id, dto);
  }

  @Get('changeStatus/:id/:isActive')
  changeStatus(
    @Param('id') id: string,
    @Param('isActive') isActive: boolean,
  ): Promise<[number, GrupoModulo[]]> {
    return this.service.changeStatus(id, isActive);
  }

  @Delete(':id')
  delete(@Param('id') id: string): Promise<void> {
    return this.service.delete(id);
  }

  @Patch('restore/:id')
  restore(@Param('id') id: string): Promise<void> {
    return this.service.restore(id);
  }
}

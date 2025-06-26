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
import { RolService } from './rol.service';
import { Rol } from './rol.model';
import { RolDTO, RolUpDTO } from './rol.dto';
import { GrupoModuloService } from '@modules/grupo-modulo/grupo-modulo.service';
import { GrupoModulo } from '@modules/grupo-modulo/grupo-modulo.model';
import { CurrentUser } from '@common/decorators/current-user.decorator';
import { JwtAuthGuard } from '@core/auth/jwt.guard';
import { PaginatedResponse } from '@common/interfaces/paginated-response.interface';
import { Usuario } from '@modules/usuario/usuario.model';
import { PaginationQueryDto } from '@common/dto/pagination-query.dto';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('roles')
export class RolController {
  constructor(
    private readonly service: RolService,
    private readonly serviceGrupoModulo: GrupoModuloService,
  ) {}

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get()
  findAll(
    @CurrentUser() user: Usuario,
    @Query() query: PaginationQueryDto,
  ): Promise<PaginatedResponse<Rol>> {
    return this.service.findAll(
      user,
      query.limit!,
      query.offset!,
      query.q?.filter,
      query.q?.search,
    );
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string): Promise<Rol | null> {
    return this.service.findOne(id);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() dto: RolDTO): Promise<Rol | null> {
    return this.service.create(dto);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() dto: RolUpDTO,
  ): Promise<[number, Rol[]]> {
    return this.service.update(id, dto);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get('changeStatus/:id/:isActive')
  changeStatus(
    @Param('id') id: string,
    @Param('isActive') isActive: boolean,
  ): Promise<[number, Rol[]]> {
    return this.service.changeStatus(id, isActive);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  delete(@Param('id') id: string): Promise<void> {
    return this.service.delete(id);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Patch('restore/:id')
  restore(@Param('id') id: string): Promise<void> {
    return this.service.restore(id);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get('findAllModulesByIdRol/:idRol')
  findAllModulesByIdRol(@Param('idRol') idRol: string): Promise<GrupoModulo[]> {
    return this.serviceGrupoModulo.findAllModulesByIdRol(idRol);
  }
}

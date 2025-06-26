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
import { PermisoRolService } from './permiso-rol.service';
import { PermisoRol } from './permiso-rol.model';
import { PermisoRolDTO } from './permiso-rol.dto';
import { ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '@core/auth/jwt.guard';
import { CurrentUser } from '@common/decorators/current-user.decorator';
import { Usuario } from '@modules/usuario/usuario.model';
import { PaginationQueryDto } from '@common/dto/pagination-query.dto';
import { PaginatedResponse } from '@common/interfaces/paginated-response.interface';

@Controller('permisoRoles')
export class PermisoRolController {
  constructor(private readonly service: PermisoRolService) {}

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get()
  findAll(
    @CurrentUser() user: Usuario,
    @Query() query: PaginationQueryDto,
  ): Promise<PaginatedResponse<PermisoRol>> {
    return this.service.findAll(
      user,
      query.limit!,
      query.offset!,
      query.q?.filter,
      query.q?.search,
    );
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<PermisoRol | null> {
    return this.service.findOne(id);
  }

  @Post()
  create(@Body() dto: PermisoRolDTO): Promise<PermisoRol | null> {
    return this.service.create(dto);
  }

  @Post('multiple')
  createMany(@Body() list: PermisoRolDTO[]): Promise<PermisoRol[]> {
    return this.service.createMany(list);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() dto: PermisoRolDTO,
  ): Promise<[number, PermisoRol[]]> {
    return this.service.update(id, dto);
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

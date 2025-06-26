import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AsistenciaUsuarioService } from './asistencia-usuario.service';
import { AsistenciaUsuario } from './asistencia-usuario.model';
import { AsistenciaUsuarioDTO } from './asistencia-usuario.dto';
import { ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '@core/auth/jwt.guard';
import { CurrentUser } from '@common/decorators/current-user.decorator';
import { Usuario } from '@modules/usuario/usuario.model';
import { PaginationQueryDto } from '@common/dto/pagination-query.dto';
import { PaginatedResponse } from '@common/interfaces/paginated-response.interface';

@Controller('asistenciaUsuario')
export class AsistenciaUsuarioController {
  constructor(private readonly service: AsistenciaUsuarioService) {}

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get()
  findAll(
    @CurrentUser() user: Usuario,
    @Query() query: PaginationQueryDto,
  ): Promise<PaginatedResponse<AsistenciaUsuario>> {
    return this.service.findAll(
      user,
      query.limit!,
      query.offset!,
      query.q?.filter,
      query.q?.search,
    );
  }

  @Post('ByMonth')
  async findAllByMonth(
    @Body() dto: { fecha: Date },
  ): Promise<AsistenciaUsuario[]> {
    if (!dto || !dto.fecha) {
      throw new BadRequestException(
        'Los parametros proporcionados no coinciden con los requeridos',
      );
    }
    return this.service.findAllByMonth(dto.fecha);
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<AsistenciaUsuario | null> {
    return this.service.findOne(id);
  }

  @Post()
  create(@Body() dto: AsistenciaUsuarioDTO): Promise<AsistenciaUsuario | null> {
    return this.service.create(dto);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() dto: AsistenciaUsuarioDTO,
  ): Promise<[number, AsistenciaUsuario[]]> {
    return this.service.update(id, dto);
  }

  @Get('changeStatus/:id/:isActive')
  changeStatus(
    @Param('id') id: string,
    @Param('isActive') isActive: boolean,
  ): Promise<[number, AsistenciaUsuario[]]> {
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

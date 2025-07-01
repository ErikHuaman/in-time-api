import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { DispositivoService } from './dispositivo.service';
import { Dispositivo } from './dispositivo.model';
import { DispositivoDTO } from './dispositivo.dto';
import { TrabajadorService } from '@modules/trabajador/trabajador.service';
import { UsuarioService } from '@modules/usuario/usuario.service';
import { ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '@core/auth/jwt.guard';
import { CurrentUser } from '@common/decorators/current-user.decorator';
import { Usuario } from '@modules/usuario/usuario.model';
import { PaginationQueryDto } from '@common/dto/pagination-query.dto';
import { PaginatedResponse } from '@common/interfaces/paginated-response.interface';

@Controller('dispositivos')
export class DispositivoController {
  constructor(
    private readonly service: DispositivoService,
    private readonly serviceTrabajador: TrabajadorService,
    private readonly usuarioService: UsuarioService,
  ) {}

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get()
  findAll(
    @CurrentUser() user: Usuario,
    @Query() query: PaginationQueryDto,
  ): Promise<PaginatedResponse<Dispositivo>> {
    return this.service.findAll(
      user,
      query.limit!,
      query.offset!,
      query.q?.filter,
      query.q?.search,
    );
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Dispositivo | null> {
    return this.service.findOne(id);
  }

  @Post()
  create(@Body() dto: DispositivoDTO): Promise<Dispositivo | null> {
    return this.service.create(dto);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() dto: DispositivoDTO,
  ): Promise<[number, Dispositivo[]]> {
    return this.service.update(id, dto);
  }

  @Get('changeStatus/:id/:isActive')
  changeStatus(
    @Param('id') id: string,
    @Param('isActive') isActive: boolean,
  ): Promise<[number, Dispositivo[]]> {
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

  @Get('findByCode/:codigo')
  findByCode(@Param('codigo') codigo: string): Promise<any> {
    return this.service.findByCode(codigo);
  }

  @Get('existeTrabajador/:identificacion')
  async findByDNI(
    @Param('identificacion') identificacion: string,
  ): Promise<any> {
    try {
      const trabajador = await this.serviceTrabajador.findByDNI(identificacion);
      if (trabajador) {
        return trabajador;
      }

      const usuario = await this.usuarioService.findByDNI(identificacion);
      if (usuario) {
        return usuario;
      }

      throw new NotFoundException(`Trabajador no encontrado`);
    } catch (error) {
      console.error('Error buscando trabajador o usuario:', error);
      throw new NotFoundException(`Trabajador no encontrado`);
    }
  }
}

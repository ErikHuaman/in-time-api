import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { AsignacionSedeUsuarioService } from './asignacion-sede-usuario.service';
import { AsignacionSedeUsuario } from './asignacion-sede-usuario.model';
import { AsignacionSedeUsuarioDTO } from './asignacion-sede-usuario.dto';
import { PaginatedResponse } from '@common/interfaces/paginated-response.interface';

@Controller('asignacionSedeUsuario')
export class AsignacionSedeUsuarioController {
  constructor(private readonly service: AsignacionSedeUsuarioService) {}

  @Get()
  findAll(): Promise<PaginatedResponse<AsignacionSedeUsuario>> {
    return this.service.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<AsignacionSedeUsuario | null> {
    return this.service.findOne(id);
  }

  @Get('ByUsuario/:idUsuario')
  findAllByUsuario(
    @Param('idTrabajador') idTrabajador: string,
  ): Promise<AsignacionSedeUsuario[]> {
    return this.service.findAllByUsuario(idTrabajador);
  }

  @Post()
  create(
    @Body() dto: AsignacionSedeUsuarioDTO,
  ): Promise<AsignacionSedeUsuario | null> {
    return this.service.create(dto);
  }

  @Post('multiple')
  createMany(
    @Body() list: AsignacionSedeUsuarioDTO[],
  ): Promise<AsignacionSedeUsuario[]> {
    return this.service.createMany(list);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() dto: AsignacionSedeUsuarioDTO,
  ): Promise<[number, AsignacionSedeUsuario[]]> {
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

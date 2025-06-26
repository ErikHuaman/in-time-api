import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { AsignacionSedeService } from './asignacion-sede.service';
import { AsignacionSede } from './asignacion-sede.model';
import { AsignacionSedeDTO } from './asignacion-sede.dto';
import { PaginatedResponse } from '@common/interfaces/paginated-response.interface';

@Controller('asignacionSede')
export class AsignacionSedeController {
  constructor(private readonly service: AsignacionSedeService) {}

  @Get()
  findAll(): Promise<PaginatedResponse<AsignacionSede>> {
    return this.service.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<AsignacionSede | null> {
    return this.service.findOne(id);
  }

  @Get('byTrabajador/:idTrabajador')
  findAllByTrabajador(
    @Param('idTrabajador') idTrabajador: string,
  ): Promise<AsignacionSede[]> {
    return this.service.findAllByTrabajador(idTrabajador);
  }

  @Post()
  create(@Body() dto: AsignacionSedeDTO): Promise<AsignacionSede | null> {
    return this.service.create(dto);
  }

  @Post('multiple')
  createMany(@Body() list: AsignacionSedeDTO[]): Promise<AsignacionSede[]> {
    return this.service.createMany(list);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() dto: AsignacionSedeDTO,
  ): Promise<[number, AsignacionSede[]]> {
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

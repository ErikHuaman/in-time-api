import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Patch,
} from '@nestjs/common';
import { ControlTrabajadorService } from './control-trabajador.service';
import { ControlTrabajador } from './control-trabajador.model';
import { ControlTrabajadorDTO } from './control-trabajador.dto';

@Controller('controlesTrabajadores')
export class ControlTrabajadorController {
  constructor(private readonly service: ControlTrabajadorService) {}

  @Get()
  findAll(): Promise<ControlTrabajador[]> {
    return this.service.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<ControlTrabajador | null> {
    return this.service.findOne(id);
  }

  @Post()
  create(@Body() dto: ControlTrabajadorDTO): Promise<ControlTrabajador | null> {
    return this.service.create(dto);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() dto: ControlTrabajadorDTO,
  ): Promise<[number, ControlTrabajador[]]> {
    return this.service.update(id, dto);
  }

  @Get('changeStatus/:id/:isActive')
  changeStatus(
    @Param('id') id: string,
    @Param('isActive') isActive: boolean,
  ): Promise<[number, ControlTrabajador[]]> {
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

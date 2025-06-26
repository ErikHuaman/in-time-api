import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Patch,
} from '@nestjs/common';
import { InfoTrabajadorService } from './info-trabajador.service';
import { InfoTrabajador } from './info-trabajador.model';
import { InfoTrabajadorDTO } from './info-trabajador.dto';

@Controller('infoTrabajadores')
export class InfoTrabajadorController {
  constructor(private readonly service: InfoTrabajadorService) {}

  @Get()
  findAll(): Promise<InfoTrabajador[]> {
    return this.service.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<InfoTrabajador | null> {
    return this.service.findOne(id);
  }

  @Post()
  create(@Body() dto: InfoTrabajadorDTO): Promise<InfoTrabajador | null> {
    return this.service.create(dto);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() dto: InfoTrabajadorDTO,
  ): Promise<[number, InfoTrabajador[]]> {
    return this.service.update(id, dto);
  }

  @Get('changeStatus/:id/:isActive')
  changeStatus(
    @Param('id') id: string,
    @Param('isActive') isActive: boolean,
  ): Promise<[number, InfoTrabajador[]]> {
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

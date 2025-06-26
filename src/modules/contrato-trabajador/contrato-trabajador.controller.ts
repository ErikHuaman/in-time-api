import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Patch,
} from '@nestjs/common';
import { ContratoTrabajadorService } from './contrato-trabajador.service';
import { ContratoTrabajador } from './contrato-trabajador.model';
import { ContratoTrabajadorDTO } from './contrato-trabajador.dto';

@Controller('contratosTrabajadores')
export class ContratoTrabajadorController {
  constructor(private readonly service: ContratoTrabajadorService) {}

  @Get()
  findAll(): Promise<ContratoTrabajador[]> {
    return this.service.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<ContratoTrabajador | null> {
    return this.service.findOne(id);
  }

  @Post()
  create(
    @Body() dto: ContratoTrabajadorDTO,
  ): Promise<ContratoTrabajador | null> {
    return this.service.create(dto);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() dto: ContratoTrabajadorDTO,
  ): Promise<[number, ContratoTrabajador[]]> {
    return this.service.update(id, dto);
  }

  @Get('changeStatus/:id/:isActive')
  changeStatus(
    @Param('id') id: string,
    @Param('isActive') isActive: boolean,
  ): Promise<[number, ContratoTrabajador[]]> {
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

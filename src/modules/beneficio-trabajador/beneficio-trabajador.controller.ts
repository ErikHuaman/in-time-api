import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Patch,
} from '@nestjs/common';
import { BeneficioTrabajadorService } from './beneficio-trabajador.service';
import { BeneficioTrabajador } from './beneficio-trabajador.model';
import { BeneficioTrabajadorDTO } from './beneficio-trabajador.dto';

@Controller('beneficiosTrabajadores')
export class BeneficioTrabajadorController {
  constructor(private readonly service: BeneficioTrabajadorService) {}

  @Get()
  findAll(): Promise<BeneficioTrabajador[]> {
    return this.service.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<BeneficioTrabajador | null> {
    return this.service.findOne(id);
  }

  @Post()
  create(
    @Body() dto: BeneficioTrabajadorDTO,
  ): Promise<BeneficioTrabajador | null> {
    return this.service.create(dto);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() dto: BeneficioTrabajadorDTO,
  ): Promise<[number, BeneficioTrabajador[]]> {
    return this.service.update(id, dto);
  }

  @Get('changeStatus/:id/:isActive')
  changeStatus(
    @Param('id') id: string,
    @Param('isActive') isActive: boolean,
  ): Promise<[number, BeneficioTrabajador[]]> {
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

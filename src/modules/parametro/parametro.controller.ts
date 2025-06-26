import { Body, Controller, Get, Param, Post, Patch } from '@nestjs/common';
import { ParametroService } from './parametro.service';
import { Parametro } from './parametro.model';
import { ParametroDTO } from './parametro.dto';

@Controller('parametro')
export class ParametroController {
  constructor(private readonly service: ParametroService) {}

  @Get()
  findFirst(): Promise<Parametro | null> {
    return this.service.findFirst();
  }

  @Post()
  create(@Body() dto: ParametroDTO): Promise<Parametro | null> {
    return this.service.create(dto);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() dto: ParametroDTO,
  ): Promise<[number, Parametro[]]> {
    return this.service.update(id, dto);
  }
}

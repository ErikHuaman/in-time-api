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
import { HorarioTrabajadorItemService } from './horario-trabajador-item.service';
import { HorarioTrabajadorItem } from './horario-trabajador-item.model';
import { HorarioTrabajadorItemDTO } from './horario-trabajador-item.dto';
import { BloqueHorasService } from '@modules/bloque-horas/bloque-horas.service';
import { ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '@core/auth/jwt.guard';
import { CurrentUser } from '@common/decorators/current-user.decorator';
import { Usuario } from '@modules/usuario/usuario.model';
import { PaginationQueryDto } from '@common/dto/pagination-query.dto';
import { PaginatedResponse } from '@common/interfaces/paginated-response.interface';

@Controller('horarioTrabajadorItems')
export class HorarioTrabajadorItemController {
  constructor(private readonly service: HorarioTrabajadorItemService) {}

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get()
  findAll(
    @CurrentUser() user: Usuario,
    @Query() query: PaginationQueryDto,
  ): Promise<PaginatedResponse<HorarioTrabajadorItem>> {
    return this.service.findAll(
      user,
      query.limit!,
      query.offset!,
      query.q?.filter,
      query.q?.search,
    );
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<HorarioTrabajadorItem | null> {
    return this.service.findOne(id);
  }

  @Post()
  create(
    @Body() dto: HorarioTrabajadorItemDTO,
  ): Promise<HorarioTrabajadorItem | null> {
    return this.service.create(dto);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() dto: HorarioTrabajadorItemDTO,
  ): Promise<[number, HorarioTrabajadorItem[]]> {
    return this.service.update(id, dto);
  }

  @Post('multiple')
  async createMany(
    @Body() list: HorarioTrabajadorItemDTO[],
  ): Promise<HorarioTrabajadorItem[]> {
    const dtoList = list.map((item) => {
      const bloque = item['bloque'];
      item.numDiaSalida = !bloque
        ? item.numDia
        : bloque.horaSalida < bloque.horaEntrada
          ? item.numDia == 7
            ? 1
            : item.numDia + 1
          : item.numDia;
      delete item['bloque'];
      return item;
    });
    return this.service.createMany(dtoList);
  }

  @Get('changeStatus/:id/:isActive')
  changeStatus(
    @Param('id') id: string,
    @Param('isActive') isActive: boolean,
  ): Promise<[number, HorarioTrabajadorItem[]]> {
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

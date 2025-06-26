import {
  BadRequestException,
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
import { FeriadoService } from './feriado.service';
import { Feriado } from './feriado.model';
import { FeriadoDTO } from './feriado.dto';
import { ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '@core/auth/jwt.guard';
import { CurrentUser } from '@common/decorators/current-user.decorator';
import { Usuario } from '@modules/usuario/usuario.model';
import { PaginationQueryDto } from '@common/dto/pagination-query.dto';
import { PaginatedResponse } from '@common/interfaces/paginated-response.interface';

@Controller('feriados')
export class FeriadoController {
  constructor(private readonly service: FeriadoService) {}

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get()
  findAll(
    @CurrentUser() user: Usuario,
    @Query() query: PaginationQueryDto,
  ): Promise<PaginatedResponse<Feriado>> {
    return this.service.findAll(
      user,
      query.limit!,
      query.offset!,
      query.q?.filter,
      query.q?.search,
    );
  }
  
  @Get(':id')
  findOne(@Param('id') id: string): Promise<Feriado | null> {
    return this.service.findOne(id);
  }

  @Post()
  create(@Body() dto: FeriadoDTO): Promise<Feriado | null> {
    return this.service.create(dto);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() dto: FeriadoDTO,
  ): Promise<[number, Feriado[]]> {
    return this.service.update(id, dto);
  }

  @Get('changeStatus/:id/:isActive')
  changeStatus(
    @Param('id') id: string,
    @Param('isActive') isActive: boolean,
  ): Promise<[number, Feriado[]]> {
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

  @Post('ByMonth')
  async findAllByMonth(@Body() dto: { fecha: Date }): Promise<any[]> {
    if (!dto || !dto.fecha) {
      throw new BadRequestException(
        'Los parametros proporcionados no coinciden con los requeridos',
      );
    }
    return this.service.findAllByMonth(dto.fecha);
  }
}

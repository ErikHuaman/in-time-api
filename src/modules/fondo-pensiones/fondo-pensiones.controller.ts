import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Patch,
  Query,
  UseGuards,
} from '@nestjs/common';
import { FondoPensionesService } from './fondo-pensiones.service';
import { FondoPensiones } from './fondo-pensiones.model';
import { FondoPensionesDTO } from './fondo-pensiones.dto';
import { ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '@core/auth/jwt.guard';
import { CurrentUser } from '@common/decorators/current-user.decorator';
import { Usuario } from '@modules/usuario/usuario.model';
import { PaginationQueryDto } from '@common/dto/pagination-query.dto';
import { PaginatedResponse } from '@common/interfaces/paginated-response.interface';

@Controller('fondoPensiones')
export class FondoPensionesController {
  constructor(private readonly service: FondoPensionesService) {}

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get()
  findAll(
    @CurrentUser() user: Usuario,
    @Query() query: PaginationQueryDto,
  ): Promise<PaginatedResponse<FondoPensiones>> {
    return this.service.findAll(
      user,
      query.limit!,
      query.offset!,
      query.q?.filter,
      query.q?.search,
    );
  }

  @Post()
  create(@Body() dto: FondoPensionesDTO): Promise<FondoPensiones | null> {
    return this.service.create(dto);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() dto: FondoPensionesDTO,
  ): Promise<[number, FondoPensiones[]]> {
    return this.service.update(id, dto);
  }

  @Post('multiple')
  updateMany(@Body() list: FondoPensionesDTO[]): Promise<boolean> {
    return this.service.updateMany(list);
  }
}

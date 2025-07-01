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
import { CargoService } from './cargo.service';
import { Cargo } from './cargo.model';
import { CargoDTO } from './cargo.dto';
import { PaginationQueryDto } from '@common/dto/pagination-query.dto';
import { PaginatedResponse } from '@common/interfaces/paginated-response.interface';
import { CurrentUser } from '@common/decorators/current-user.decorator';
import { Usuario } from '@modules/usuario/usuario.model';
import { ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '@core/auth/jwt.guard';
import { ParseJsonPipe } from '@common/pipes/parse-json.pipe';

@Controller('cargos')
export class CargoController {
  constructor(private readonly service: CargoService) {}

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get()
  findAll(
    @CurrentUser() user: Usuario,
    @Query() query: PaginationQueryDto,
  ): Promise<PaginatedResponse<Cargo>> {
    return this.service.findAll(
      user,
      query.limit!,
      query.offset!,
      query.q?.filter,
      query.q?.search,
    );
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string): Promise<Cargo | null> {
    return this.service.findOne(id);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body(ParseJsonPipe) dto: CargoDTO): Promise<Cargo | null> {
    return this.service.create(dto);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body(ParseJsonPipe) dto: CargoDTO,
  ): Promise<[number, Cargo[]]> {
    return this.service.update(id, dto);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get('changeStatus/:id/:isActive')
  changeStatus(
    @Param('id') id: string,
    @Param('isActive') isActive: boolean,
  ): Promise<[number, Cargo[]]> {
    return this.service.changeStatus(id, isActive);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  delete(@Param('id') id: string): Promise<void> {
    return this.service.delete(id);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Patch('restore/:id')
  restore(@Param('id') id: string): Promise<void> {
    return this.service.restore(id);
  }
}

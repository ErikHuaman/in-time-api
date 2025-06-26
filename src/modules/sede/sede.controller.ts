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
import { SedeService } from './sede.service';
import { Sede } from './sede.model';
import { SedeDTO } from './sede.dto';
import { JwtAuthGuard } from '@core/auth/jwt.guard';
import { CurrentUser } from '@common/decorators/current-user.decorator';
import { AsignacionSedeUsuarioService } from '@modules/asignacion-sede-usuario/asignacion-sede-usuario.service';
import { ApiBearerAuth } from '@nestjs/swagger';
import { PaginationQueryDto } from '@common/dto/pagination-query.dto';
import { PaginatedResponse } from '@common/interfaces/paginated-response.interface';
import { Usuario } from '@modules/usuario/usuario.model';
import { ParseJsonPipe } from '@common/pipes/parse-json.pipe';

@Controller('sedes')
export class SedeController {
  constructor(
    private readonly service: SedeService,
    private readonly asignacionSedeUsuario: AsignacionSedeUsuarioService,
  ) {}

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get()
  findAll(
    @CurrentUser() user: Usuario,
    @Query() query: PaginationQueryDto,
  ): Promise<PaginatedResponse<Sede>> {
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
  findOne(@Param('id') id: string): Promise<Sede | null> {
    return this.service.findOne(id);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body(ParseJsonPipe) dto: SedeDTO): Promise<Sede | null> {
    const sede = await this.service.create(dto);
    await this.asignacionSedeUsuario.create({
      idSede: sede?.get()?.id,
      idUsuario: '66d82ceb-782c-41b6-b0ba-270a1bf535ed',
    });
    return sede;
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post('multiple')
  async createMany(@Body() list: SedeDTO[]): Promise<Sede[]> {
    const sedes = await this.service.createMany(list);
    await this.asignacionSedeUsuario.createMany(
      sedes.map((sede) => ({
        idSede: sede?.get()?.id,
        idUsuario: '66d82ceb-782c-41b6-b0ba-270a1bf535ed',
      })),
    );
    return sedes;
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body(ParseJsonPipe) dto: SedeDTO,
  ): Promise<[number, Sede[]]> {
    return this.service.update(id, dto);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get('changeStatus/:id/:isActive')
  changeStatus(
    @Param('id') id: string,
    @Param('isActive') isActive: boolean,
  ): Promise<[number, Sede[]]> {
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

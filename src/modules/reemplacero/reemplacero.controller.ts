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
  Res,
  UploadedFile,
  UseGuards,
  UseInterceptors,
  Inject,
  forwardRef,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';
import { ReemplaceroService } from './reemplacero.service';
import { Reemplacero } from './reemplacero.model';
import { FaceService } from '@modules/face/face.service';
import { ReemplaceroDTO } from './reemplacero.dto';
import { ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '@core/auth/jwt.guard';
import { CurrentUser } from '@common/decorators/current-user.decorator';
import { Usuario } from '@modules/usuario/usuario.model';
import { PaginationQueryDto } from '@common/dto/pagination-query.dto';
import { PaginatedResponse } from '@common/interfaces/paginated-response.interface';
import { ParseJsonPipe } from '@common/pipes/parse-json.pipe';

@Controller('reemplacero')
export class ReemplaceroController {
  constructor(
    private readonly service: ReemplaceroService,
    @Inject(forwardRef(() => FaceService))
    private readonly faceService: FaceService,
  ) {}

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get()
  findAll(
    @CurrentUser() user: Usuario,
    @Query() query: PaginationQueryDto,
  ): Promise<PaginatedResponse<Reemplacero>> {
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
  findOne(@Param('id') id: string): Promise<Reemplacero | null> {
    return this.service.findOne(id);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post()
  @UseInterceptors(FileInterceptor('archivo'))
  async create(
    @UploadedFile() file: Express.Multer.File,
    @Body('dto', ParseJsonPipe) dto: Partial<Reemplacero>,
  ): Promise<Reemplacero | null> {
    if (file) {
      const resFace = await this.faceService.getDescriptorFromBuffer(
        file.buffer,
        file.originalname,
        file.mimetype,
      );

      if (!resFace.descriptor) {
        throw new BadRequestException(resFace.msg);
      }

      let descriptor: Float32Array = resFace.descriptor;

      return this.service.create(
        dto,
        Buffer.from(file.buffer),
        file.originalname,
        file.mimetype,
        Array.from(descriptor),
      );
    } else {
      return this.service.create(dto);
    }
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  @UseInterceptors(FileInterceptor('archivo'))
  async update(
    @Param('id') id: string,
    @UploadedFile() file: Express.Multer.File,
    @Body('dto', ParseJsonPipe) dto: Partial<Reemplacero>,
  ): Promise<[number, Reemplacero[]]> {
    if (file) {
      const resFace = await this.faceService.getDescriptorFromBuffer(
        file.buffer,
        file.originalname,
        file.mimetype,
      );

      if (!resFace.descriptor) {
        throw new BadRequestException(resFace.msg);
      }

      let descriptor: Float32Array = resFace.descriptor;

      const archivo = Buffer.from(file.buffer);
      return this.service.update(
        id,
        dto,
        archivo,
        file.originalname,
        file.mimetype,
        Array.from(descriptor),
      );
    }
    return this.service.update(id, dto);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get('changeStatus/:id/:isActive')
  changeStatus(
    @Param('id') id: string,
    @Param('isActive') isActive: boolean,
  ): Promise<[number, Reemplacero[]]> {
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

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get('obtenerArchivo/:id')
  async obtenerArchivo(@Param('id') id: string, @Res() res: Response) {
    const archivo = await this.service.obtenerArchivo(id);
    res.setHeader(
      'Content-Disposition',
      `attachment; filename="${archivo.filename}"`,
    );
    res.setHeader('Content-Type', archivo.mimetype);
    return res.send(archivo.file);
  }
}

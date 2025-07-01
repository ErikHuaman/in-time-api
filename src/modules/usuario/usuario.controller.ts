import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  forwardRef,
  Get,
  Inject,
  Param,
  Patch,
  Post,
  Query,
  Res,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { Response } from 'express';
import { UsuarioService } from './usuario.service';
import { Usuario } from './usuario.model';
import { UsuarioDTO, UsuarioUpDTO } from './usuario.dto';
import { CurrentUser } from '@common/decorators/current-user.decorator';
import { JwtAuthGuard } from '@core/auth/jwt.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { FaceService } from '@modules/face/face.service';
import { PaginationQueryDto } from '@common/dto/pagination-query.dto';
import { PaginatedResponse } from '@common/interfaces/paginated-response.interface';
import { ApiBearerAuth } from '@nestjs/swagger';
import { ParseJsonPipe } from '@common/pipes/parse-json.pipe';

@Controller('usuarios')
export class UsuarioController {
  constructor(
    private readonly service: UsuarioService,
    @Inject(forwardRef(() => FaceService))
    private readonly faceService: FaceService,
  ) {}

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get()
  findAll(
    @CurrentUser() user: Usuario,
    @Query() query: PaginationQueryDto,
  ): Promise<PaginatedResponse<Usuario>> {
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
  findOne(@Param('id') id: string): Promise<Usuario | null> {
    return this.service.findOne(id);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post()
  @UseInterceptors(FileInterceptor('archivo'))
  async create(
    @UploadedFile() file: Express.Multer.File,
    @Body('dto', ParseJsonPipe) dto: Partial<Usuario>,
  ): Promise<Usuario | null> {
    if (file) {
      dto.archivoNombre = file.originalname;
      let descriptor: Float32Array | null =
        await this.faceService.getDescriptorFromBuffer(file.buffer);
      if (!descriptor) {
        throw new BadRequestException('No se detectó rostro en la imagen');
      }
      return this.service.create(
        dto,
        Buffer.from(file.buffer),
        Array.from(descriptor),
      );
    } else {
      return this.service.create(dto, undefined, undefined);
    }
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  @UseInterceptors(FileInterceptor('archivo'))
  async update(
    @Param('id') id: string,
    @UploadedFile() file: Express.Multer.File,
    @Body('dto', ParseJsonPipe) dto: Partial<Usuario>,
  ): Promise<[number, Usuario[]]> {
    if (file) {
      dto.archivoNombre = file.originalname;
      let descriptor: Float32Array | null =
        await this.faceService.getDescriptorFromBuffer(file.buffer);
      if (!descriptor) {
        throw new BadRequestException('No se detectó un rostro en la imagen');
      }
      const archivo = Buffer.from(file.buffer);
      return this.service.update(id, dto, archivo, Array.from(descriptor));
    }
    return this.service.update(id, dto, undefined, undefined);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get('changeStatus/:id/:isActive')
  changeStatus(
    @Param('id') id: string,
    @Param('isActive') isActive: boolean,
  ): Promise<[number, Usuario[]]> {
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
      `attachment; filename="${archivo.fileName}"`,
    );
    res.setHeader('Content-Type', 'application/octet-stream');
    return res.send(archivo.file);
  }
}

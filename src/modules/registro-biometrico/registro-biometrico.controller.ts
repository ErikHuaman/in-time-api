import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Patch,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';
import { RegistroBiometricoService } from './registro-biometrico.service';
import { RegistroBiometrico } from './registro-biometrico.model';
import { RegistroBiometricoDTO } from './registro-biometrico.dto';
import { FaceService } from '@modules/face/face.service';

@Controller('registrosBiometricos')
export class RegistroBiometricoController {
  constructor(
    private readonly service: RegistroBiometricoService,
    private readonly faceService: FaceService,
  ) {}

  @Get()
  findAll(): Promise<RegistroBiometrico[]> {
    return this.service.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<RegistroBiometrico | null> {
    return this.service.findOne(id);
  }

  @Post()
  @UseInterceptors(FileInterceptor('archivo'))
  async create(
    @UploadedFile() file: Express.Multer.File,
    @Body() dto: RegistroBiometricoDTO,
  ): Promise<RegistroBiometrico | null> {
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
      return this.service.create(dto);
    }
  }

  @Patch(':id')
  @UseInterceptors(FileInterceptor('archivo'))
  async update(
    @Param('id') id: string,
    @UploadedFile() file: Express.Multer.File,
    @Body() dto: RegistroBiometricoDTO,
  ): Promise<[number, RegistroBiometrico[]]> {
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

  @Get('changeStatus/:id/:isActive')
  changeStatus(
    @Param('id') id: string,
    @Param('isActive') isActive: boolean,
  ): Promise<[number, RegistroBiometrico[]]> {
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

import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FaceService } from './face.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { MarcacionAsistenciaDTO } from '@modules/asistencia/asistencia.dto';

@Controller('face')
export class FaceController {
  constructor(private readonly faceService: FaceService) {}

  @Post('registroAsistencia/:identificacion')
  @UseInterceptors(FileInterceptor('image'))
  async verify(
    @Param('identificacion') identificacion: string,
    @Body() dto: MarcacionAsistenciaDTO,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<any> {

    console.log("dto", dto);

    if(!file){
      throw new BadRequestException('La fotografía es obligatoria');
    }

    if (dto.esTrabajador) {
      return this.faceService.compareWithReference(
        identificacion,
        dto,
        file.buffer,
        file.originalname,
        file.mimetype,
      );
    } else {
      return this.faceService.compareWithReferenceUsuario(
        identificacion,
        dto,
        file.buffer,
        file.originalname,
        file.mimetype,
      );
    }
  }
}

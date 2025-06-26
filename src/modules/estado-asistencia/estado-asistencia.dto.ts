import {
  IsString,
  IsBoolean,
  IsOptional,
  IsNotEmpty,
  IsUUID,
} from 'class-validator';
import { ValidationMessages as v }  from '@common/messages/validation-messages';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
export class EstadoAsistenciaDTO {
  @ApiPropertyOptional()
  @IsUUID('4', { message: v.isUUID('id') })
  @IsOptional()
  id?: string;

  @ApiProperty()
  @IsString({ message: v.isString('nombre') })
  @IsNotEmpty({ message: v.isNotEmpty('nombre') })
  nombre: string;

  @ApiProperty()
  @IsString({ message: v.isString('codigo') })
  @IsNotEmpty({ message: v.isNotEmpty('codigo') })
  codigo: string;

  @ApiProperty()
  @IsString({ message: v.isString('bgColor') })
  @IsNotEmpty({ message: v.isNotEmpty('bgColor') })
  bgColor: string;

  @ApiProperty()
  @IsString({ message: v.isString('textColor') })
  @IsNotEmpty({ message: v.isNotEmpty('textColor') })
  textColor: string;

  @ApiProperty()
  @IsBoolean({ message: v.isBoolean('isActive') })
  @IsOptional()
  isActive?: boolean;
}

import {
  IsString,
  IsBoolean,
  IsOptional,
  IsNotEmpty,
  IsUUID,
} from 'class-validator';
import { ValidationMessages as v }  from '@common/messages/validation-messages';
import { Sede } from './sede.model';
import { IsUnique } from '@common/validators/is-unique/is-unique.decorator';
import { ApiProperty } from '@nestjs/swagger';

export class SedeDTO {
  @IsUUID('4', { message: v.isUUID('id') })
  @IsOptional()
  id: string;

  @ApiProperty()
  @IsString({ message: v.isString('nombre') })
  @IsNotEmpty({ message: v.isNotEmpty('nombre') })
  @IsUnique(Sede, 'nombre', { message: v.isUnique('nombre') })
  nombre: string;

  @ApiProperty()
  @IsString({ message: v.isString('ruc') })
  @IsNotEmpty({ message: v.isNotEmpty('ruc') })
  ruc: string;

  @ApiProperty()
  @IsString({ message: v.isString('razonSocial') })
  @IsNotEmpty({ message: v.isNotEmpty('razonSocial') })
  razonSocial: string;

  @ApiProperty()
  @IsString({ message: v.isString('direccion') })
  @IsNotEmpty({ message: v.isNotEmpty('direccion') })
  direccion: string;

  @ApiProperty()
  @IsString({ message: v.isString('latitud') })
  @IsNotEmpty({ message: v.isNotEmpty('latitud') })
  latitud: string;

  @ApiProperty()
  @IsString({ message: v.isString('longitud') })
  @IsNotEmpty({ message: v.isNotEmpty('longitud') })
  longitud: string;

  @IsUUID('4', { message: v.isUUID('idCiudad') })
  idCiudad: string;

  @ApiProperty()
  @IsBoolean({ message: v.isBoolean('isActive') })
  @IsOptional()
  isActive?: boolean;
}

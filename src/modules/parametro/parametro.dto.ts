import {
  IsString,
  IsOptional,
  IsNotEmpty,
  IsUUID,
  IsNumber,
} from 'class-validator';
import { ValidationMessages as v }  from '@common/messages/validation-messages';

export class ParametroDTO {
  @IsUUID('4', { message: v.isUUID('id') })
  @IsOptional()
  id: string;

  @IsString({ message: v.isString('ruc') })
  @IsNotEmpty({ message: v.isNotEmpty('ruc') })
  ruc: string;

  @IsString({ message: v.isString('razonSocial') })
  @IsNotEmpty({ message: v.isNotEmpty('razonSocial') })
  razonSocial: string;

  @IsString({ message: v.isString('rubro') })
  @IsNotEmpty({ message: v.isNotEmpty('rubro') })
  rubro: string;

  @IsString({ message: v.isString('direccion') })
  @IsNotEmpty({ message: v.isNotEmpty('direccion') })
  direccion: string;

  @IsNumber({}, { message: v.isNumber('porcentaje25') })
  @IsNotEmpty({ message: v.isNotEmpty('porcentaje25') })
  porcentaje25: number;

  @IsNumber({}, { message: v.isNumber('porcentaje35') })
  @IsNotEmpty({ message: v.isNotEmpty('porcentaje35') })
  porcentaje35: number;
}

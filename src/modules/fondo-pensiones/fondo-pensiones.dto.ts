import {
  IsString,
  IsOptional,
  IsNotEmpty,
  IsUUID,
  IsNumber,
  IsBoolean,
} from 'class-validator';
import { ValidationMessages as v }  from '@common/messages/validation-messages';
import { IsUnique } from '@common/validators/is-unique/is-unique.decorator';
import { FondoPensiones } from './fondo-pensiones.model';

export class FondoPensionesDTO {
  @IsUUID('4', { message: v.isUUID('id') })
  @IsOptional()
  id: string;

  @IsString({ message: v.isString('nombre') })
  @IsNotEmpty({ message: v.isNotEmpty('nombre') })
  @IsUnique(FondoPensiones, 'nombre', { message: v.isUnique('nombre') })
  nombre: string;

  @IsNumber({}, { message: v.isNumber('seguro') })
  @IsNotEmpty({ message: v.isNotEmpty('seguro') })
  seguro: number;

  @IsNumber({}, { message: v.isNumber('pension') })
  @IsOptional()
  pension: number;

  @IsNumber({}, { message: v.isNumber('comision') })
  @IsOptional()
  comision: number;

  @IsBoolean({ message: v.isBoolean('esFijo') })
  @IsOptional()
  esFijo: boolean;
}

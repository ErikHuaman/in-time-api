import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';
import { ValidationMessages as v }  from '@common/messages/validation-messages';
import { IsUnique } from '@common/validators/is-unique/is-unique.decorator';
import { Rol } from './rol.model';

export class RolDTO {
  @IsUUID('4', { message: v.isUUID('id') })
  @IsOptional()
  id?: string;

  @IsNumber({}, { message: v.isNumber('orden') })
  @IsOptional()
  orden?: number;

  @IsString({ message: v.isString('codigo') })
  @IsNotEmpty({ message: v.isNotEmpty('codigo') })
  @IsUnique(Rol, 'codigo', { message: v.isUnique('codigo') })
  codigo: string;

  @IsString({ message: v.isString('nombre') })
  @IsNotEmpty({ message: v.isNotEmpty('nombre') })
  nombre: string;

  @IsBoolean({ message: v.isBoolean('isActive') })
  @IsOptional()
  isActive?: boolean;
}

export class RolUpDTO {
  @IsNumber({}, { message: v.isNumber('orden') })
  @IsOptional()
  orden?: number;

  @IsString({ message: v.isString('nombre') })
  @IsNotEmpty({ message: v.isNotEmpty('nombre') })
  nombre?: string;

  @IsString({ message: v.isString('codigo') })
  @IsNotEmpty({ message: v.isNotEmpty('codigo') })
  codigo?: string;

  @IsBoolean({ message: v.isBoolean('isActive') })
  @IsOptional()
  isActive?: boolean;
}

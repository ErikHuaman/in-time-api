import {
  IsString,
  IsBoolean,
  IsOptional,
  IsNotEmpty,
  IsUUID,
} from 'class-validator';
import { ValidationMessages as v }  from '@common/messages/validation-messages';
import { IsUnique } from '@common/validators/is-unique/is-unique.decorator';
import { Modulo } from './modulo.model';

export class ModuloDTO {
  @IsUUID('4', { message: v.isUUID('id') })
  @IsOptional()
  id: string;

  @IsString({ message: v.isString('nombre') })
  @IsNotEmpty({ message: v.isNotEmpty('nombre') })
  @IsUnique(Modulo, 'nombre', { message: v.isUnique('nombre') })
  nombre: string;

  @IsString({ message: v.isString('url') })
  @IsNotEmpty({ message: v.isNotEmpty('url') })
  url: string;

  @IsString({ message: v.isString('icono') })
  @IsNotEmpty({ message: v.isNotEmpty('icono') })
  icono: string;

  @IsUUID('4', { message: v.isUUID('idGrupoModulo') })
  idGrupoModulo: string;

  @IsBoolean({ message: v.isBoolean('isActive') })
  @IsOptional()
  isActive?: boolean;
}

import {
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';
import { ValidationMessages as v }  from '@common/messages/validation-messages';

export class InfoTrabajadorDTO {
  @IsUUID('4', { message: v.isUUID('id') })
  @IsOptional()
  id: string;

  @IsUUID('4', { message: v.isUUID('idCiudad') })
  @IsOptional()
  idCiudad: string;

  @IsString({ message: v.isString('direccion') })
  @IsNotEmpty({ message: v.isNotEmpty('direccion') })
  @IsOptional()
  direccion: string;

  @IsString({ message: v.isString('celular') })
  @IsNotEmpty({ message: v.isNotEmpty('celular') })
  @IsOptional()
  celular: string;

  @IsString({ message: v.isString('correo') })
  @IsNotEmpty({ message: v.isNotEmpty('correo') })
  @IsOptional()
  correo: string;

  @IsUUID('4', { message: v.isUUID('idTrabajador') })
  idTrabajador: string;

  @IsBoolean({ message: v.isBoolean('isActive') })
  @IsOptional()
  isActive?: boolean;
}

import {
  IsBoolean,
  IsOptional,
  IsNotEmpty,
  IsUUID,
  IsNumber,
  IsString,
} from 'class-validator';
import { ValidationMessages as v }  from '@common/messages/validation-messages';
import { Transform } from 'class-transformer';

export class AsistenciaUsuarioDTO {
  @IsUUID('4', { message: v.isUUID('id') })
  @IsOptional()
  id: string;

  @IsUUID('4', { message: v.isUUID('idDispositivo') })
  @IsNotEmpty({ message: v.isNotEmpty('idDispositivo') })
  idDispositivo: string;

  @IsUUID('4', { message: v.isUUID('idUsuario') })
  @IsNotEmpty({ message: v.isNotEmpty('idUsuario') })
  idUsuario: string;

  @IsNotEmpty({ message: v.isNotEmpty('fecha') })
  fecha: Date;

  @IsNotEmpty({ message: v.isNotEmpty('marcacionEntrada') })
  marcacionEntrada: Date;

  @IsNotEmpty({ message: v.isNotEmpty('marcacionSalida') })
  marcacionSalida: Date;

  @IsBoolean({ message: v.isBoolean('isActive') })
  @IsOptional()
  isActive?: boolean;
}

export class MarcacionAsistenciaUsuarioDTO {
  @IsNotEmpty({ message: v.isNotEmpty('fecha') })
  fecha: Date;

  @IsNotEmpty({ message: v.isNotEmpty('tipo') })
  tipo: 'entrada' | 'salida';

  @IsNotEmpty({ message: v.isNotEmpty('latitud') })
  @IsString({ message: v.isString('latitud') })
  latitud: string;

  @IsNotEmpty({ message: v.isNotEmpty('longitud') })
  @IsString({ message: v.isString('longitud') })
  longitud: string;

  @IsUUID('4', { message: v.isUUID('idDispositivo') })
  idDispositivo: string;

  @IsOptional()
  @IsString({ message: v.isString('codigo') })
  codigo: string;

  @IsBoolean({ message: v.isBoolean('esTrabajador') })
  @Transform(({ value }) => value === 'true' || value === true)
  esTrabajador: boolean;
}

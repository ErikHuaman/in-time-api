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

export class AsistenciaDTO {
  @IsUUID('4', { message: v.isUUID('id') })
  @IsOptional()
  id: string;

  @IsUUID('4', { message: v.isUUID('idDispositivo') })
  @IsNotEmpty({ message: v.isNotEmpty('idDispositivo') })
  idDispositivo: string;

  @IsUUID('4', { message: v.isUUID('idTrabajador') })
  @IsNotEmpty({ message: v.isNotEmpty('idTrabajador') })
  idTrabajador: string;

  @IsUUID('4', { message: v.isUUID('idHorarioTrabajador') })
  @IsNotEmpty({ message: v.isNotEmpty('idHorarioTrabajador') })
  idHorarioTrabajador: string;

  @IsUUID('4', { message: v.isUUID('idHorarioTrabajadorItem') })
  @IsNotEmpty({ message: v.isNotEmpty('idHorarioTrabajadorItem') })
  idHorarioTrabajadorItem: string;

  @IsNotEmpty({ message: v.isNotEmpty('fecha') })
  fecha: Date;

  @IsNotEmpty({ message: v.isNotEmpty('marcacionEntrada') })
  marcacionEntrada: Date;

  @IsNotEmpty({ message: v.isNotEmpty('diferenciaEntrada') })
  @IsNumber({}, { message: v.isNumber('diferenciaEntrada') })
  diferenciaEntrada: number;

  @IsNotEmpty({ message: v.isNotEmpty('marcacionSalida') })
  marcacionSalida: Date;

  @IsNotEmpty({ message: v.isNotEmpty('diferenciaSalida') })
  @IsNumber({}, { message: v.isNumber('diferenciaSalida') })
  diferenciaSalida: number;

  @IsBoolean({ message: v.isBoolean('isActive') })
  @IsOptional()
  isActive?: boolean;
}

export class MarcacionAsistenciaDTO {
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

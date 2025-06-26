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

export class JustificacionInasistenciaDTO {
  @IsUUID('4', { message: v.isUUID('id') })
  @IsOptional()
  id: string;

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

  @IsString({ message: v.isString('nota') })
  @IsOptional()
  nota: string;

  @IsBoolean({ message: v.isBoolean('conGoce') })
  @Transform(({ value }) => value === 'true' || value === true)
  @IsOptional()
  conGoce?: boolean;

  @IsBoolean({ message: v.isBoolean('incluirExtra') })
  @Transform(({ value }) => value === 'true' || value === true)
  @IsOptional()
  incluirExtra?: boolean;

  @IsBoolean({ message: v.isBoolean('isActive') })
  @IsOptional()
  isActive?: boolean;
}

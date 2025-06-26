import {
  IsString,
  IsBoolean,
  IsOptional,
  IsNotEmpty,
  IsUUID,
  IsNumber,
} from 'class-validator';
import { ValidationMessages as v }  from '@common/messages/validation-messages';
import { Transform } from 'class-transformer';

export class PermisoTrabajadorDTO {
  @IsUUID('4', { message: v.isUUID('id') })
  @IsOptional()
  id: string;

  @IsUUID('4', { message: v.isUUID('idSede') })
  @IsNotEmpty({ message: v.isNotEmpty('idSede') })
  idSede: string;

  @IsUUID('4', { message: v.isUUID('idCargo') })
  @IsNotEmpty({ message: v.isNotEmpty('idCargo') })
  idCargo: string;

  @IsUUID('4', { message: v.isUUID('idTrabajador') })
  @IsNotEmpty({ message: v.isNotEmpty('idTrabajador') })
  idTrabajador: string;

  @IsString({ message: v.isString('nota') })
  @IsOptional()
  nota: string;

  @IsNotEmpty({ message: v.isNotEmpty('fechaInicio') })
  fechaInicio: Date;

  @IsNotEmpty({ message: v.isNotEmpty('fechaFin') })
  fechaFin: Date;

  @IsBoolean({ message: v.isBoolean('conGoce') })
  @Transform(({ value }) => value === 'true' || value === true)
  @IsOptional()
  conGoce?: boolean;

  @IsBoolean({ message: v.isBoolean('incluirExtra') })
  @Transform(({ value }) => value === 'true' || value === true)
  @IsOptional()
  incluirExtra?: boolean;

  @IsBoolean({ message: v.isBoolean('isActive') })
  @Transform(({ value }) => value === 'true' || value === true)
  @IsOptional()
  isActive?: boolean;
}

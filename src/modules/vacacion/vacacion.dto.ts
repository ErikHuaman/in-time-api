import {
  IsString,
  IsBoolean,
  IsOptional,
  IsNotEmpty,
  IsUUID,
  IsNumber,
} from 'class-validator';
import { ValidationMessages as v }  from '@common/messages/validation-messages';

export class VacacionDTO {
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

  @IsNumber({}, { message: v.isNumber('diasDisponibles') })
  @IsNotEmpty({ message: v.isNotEmpty('diasDisponibles') })
  diasDisponibles: number;

  @IsNumber({}, { message: v.isNumber('diasUtilizados') })
  @IsNotEmpty({ message: v.isNotEmpty('diasUtilizados') })
  diasUtilizados: number;

  @IsNotEmpty({ message: v.isNotEmpty('fechaInicio') })
  fechaInicio: Date;

  @IsNotEmpty({ message: v.isNotEmpty('fechaFin') })
  fechaFin: Date;

  @IsBoolean({ message: v.isBoolean('isActive') })
  @IsOptional()
  isActive?: boolean;
}

import {
  IsString,
  IsBoolean,
  IsOptional,
  IsNotEmpty,
  IsUUID,
  IsNumber,
} from 'class-validator';
import { ValidationMessages as v }  from '@common/messages/validation-messages';

export class HorarioTrabajadorItemDTO {
  @IsUUID('4', { message: v.isUUID('id') })
  @IsOptional()
  id: string;

  @IsNumber({}, { message: v.isNumber('numDia') })
  @IsNotEmpty({ message: v.isNotEmpty('numDia') })
  numDia: number;

  @IsNumber({}, { message: v.isNumber('numDiaSalida') })
  @IsNotEmpty({ message: v.isNotEmpty('numDiaSalida') })
  numDiaSalida: number;

  @IsNumber({}, { message: v.isNumber('numTurno') })
  @IsNotEmpty({ message: v.isNotEmpty('numTurno') })
  numTurno: number;

  @IsBoolean({ message: v.isBoolean('diaLibre') })
  @IsNotEmpty({ message: v.isNotEmpty('diaLibre') })
  diaLibre: boolean;

  @IsBoolean({ message: v.isBoolean('diaDescanso') })
  @IsNotEmpty({ message: v.isNotEmpty('diaDescanso') })
  diaDescanso: boolean;

  @IsUUID('4', { message: v.isUUID('idBloqueHoras') })
  @IsOptional()
  idBloqueHoras: string;

  @IsUUID('4', { message: v.isUUID('idHorarioTrabajador') })
  @IsNotEmpty({ message: v.isNotEmpty('idHorarioTrabajador') })
  idHorarioTrabajador: string;

  @IsUUID('4', { message: v.isUUID('idSede') })
  @IsOptional()
  idSede: string;

  @IsBoolean({ message: v.isBoolean('isActive') })
  @IsOptional()
  isActive?: boolean;
}

import {
  IsString,
  IsBoolean,
  IsOptional,
  IsNotEmpty,
  IsUUID,
  IsNumber,
} from 'class-validator';
import { ValidationMessages as v }  from '@common/messages/validation-messages';

export class PatronHorarioItemDTO {
  @IsUUID('4', { message: v.isUUID('id') })
  @IsOptional()
  id: string;

  @IsNumber({}, { message: v.isNumber('numDia') })
  @IsNotEmpty({ message: v.isNotEmpty('numDia') })
  numDia: number;

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
  @IsNotEmpty({ message: v.isNotEmpty('idBloqueHoras') })
  idBloqueHoras: string;
  
  @IsUUID('4', { message: v.isUUID('idPatronHorario') })
  @IsNotEmpty({ message: v.isNotEmpty('idPatronHorario') })
  idPatronHorario: string;

  @IsBoolean({ message: v.isBoolean('isActive') })
  @IsOptional()
  isActive?: boolean;
}

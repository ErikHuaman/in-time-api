import {
  IsString,
  IsBoolean,
  IsOptional,
  IsNotEmpty,
  IsUUID,
  IsNumber,
} from 'class-validator';
import { ValidationMessages as v }  from '@common/messages/validation-messages';

export class HorarioTrabajadorDTO {
  @IsUUID('4', { message: v.isUUID('id') })
  @IsOptional()
  id: string;

  @IsUUID('4', { message: v.isUUID('idTrabajador') })
  @IsNotEmpty({ message: v.isNotEmpty('idTrabajador') })
  idTrabajador: string;

  @IsUUID('4', { message: v.isUUID('idTurnoTrabajo') })
  @IsNotEmpty({ message: v.isNotEmpty('idTurnoTrabajo') })
  idTurnoTrabajo: string;

  @IsUUID('4', { message: v.isUUID('idTipoTurno') })
  @IsNotEmpty({ message: v.isNotEmpty('idTipoTurno') })
  idTipoTurno: string;
  
  @IsUUID('4', { message: v.isUUID('idPatronHorario') })
  @IsOptional()
  idPatronHorario: string;

  @IsBoolean({ message: v.isBoolean('isActive') })
  @IsOptional()
  isActive?: boolean;
}

import {
  IsString,
  IsBoolean,
  IsOptional,
  IsNotEmpty,
  IsUUID,
  IsNumber,
} from 'class-validator';
import { ValidationMessages as v }  from '@common/messages/validation-messages';

export class ReemplazoHorarioDTO {
  @IsUUID('4', { message: v.isUUID('id') })
  @IsOptional()
  id: string;

  @IsUUID('4', { message: v.isUUID('idTrabajador') })
  @IsNotEmpty({ message: v.isNotEmpty('idTrabajador') })
  idTrabajador: string;

  @IsUUID('4', { message: v.isUUID('idReemplacero') })
  @IsNotEmpty({ message: v.isNotEmpty('idReemplacero') })
  idReemplacero: string;

  @IsString({ message: v.isString('nota') })
  @IsOptional()
  nota: string;

  @IsNumber({}, { message: v.isNumber('pago') })
  @IsNotEmpty({ message: v.isNotEmpty('pago') })
  pago: number;

  @IsNotEmpty({ message: v.isNotEmpty('fechaInicio') })
  fechaInicio: Date;

  @IsNotEmpty({ message: v.isNotEmpty('fechaFin') })
  fechaFin: Date;

  @IsBoolean({ message: v.isBoolean('isActive') })
  @IsOptional()
  isActive?: boolean;
}

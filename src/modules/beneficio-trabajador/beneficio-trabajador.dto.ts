import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';
import { ValidationMessages as v }  from '@common/messages/validation-messages';

export class BeneficioTrabajadorDTO {
  @IsUUID('4', { message: v.isUUID('id') })
  @IsOptional()
  id: string;

  @IsUUID('4', { message: v.isUUID('idFondoPensiones') })
  @IsOptional()
  idFondoPensiones: string;

  @IsNumber({}, { message: v.isNumber('pagoFeriado') })
  @IsOptional()
  pagoFeriado: number;

  @IsUUID('4', { message: v.isUUID('idSeguro') })
  @IsOptional()
  idSeguroSalud: string;

  @IsUUID('4', { message: v.isUUID('idTrabajador') })
  idTrabajador: string;

  @IsBoolean({ message: v.isBoolean('isActive') })
  @IsOptional()
  isActive?: boolean;
}

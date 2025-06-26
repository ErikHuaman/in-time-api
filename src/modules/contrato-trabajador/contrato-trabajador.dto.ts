import {
  IsBoolean,
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';
import { ValidationMessages as v }  from '@common/messages/validation-messages';
import { IsUnique } from '@common/validators/is-unique/is-unique.decorator';
import { ContratoTrabajador } from './contrato-trabajador.model';

export class ContratoTrabajadorDTO {
  @IsUUID('4', { message: v.isUUID('id') })
  @IsOptional()
  id: string;

  @IsOptional()
  @IsString({ message: v.isNumber('numNomina') })
  @IsUnique(ContratoTrabajador, 'numNomina', {
    message: v.isUnique('numNomina'),
  })
  numNomina: string;

  @IsNotEmpty({ message: v.isNotEmpty('fechaContrato') })
  fechaContrato: Date;

  @IsNotEmpty({ message: v.isNotEmpty('fechaInicio') })
  fechaInicio: Date;

  @IsUUID('4', { message: v.isUUID('idCargo') })
  idCargo: string;

  @IsUUID('4', { message: v.isUUID('idTiempoContrato') })
  idTiempoContrato: string;

  @IsUUID('4', { message: v.isUUID('idFrecuenciaPago') })
  idFrecuenciaPago: string;

  @IsNumber({}, { message: v.isNumber('horasContrato') })
  horasContrato: number;

  @IsNumber({}, { message: v.isNumber('salarioMensual') })
  salarioMensual: number;

  @IsUUID('4', { message: v.isUUID('idTrabajador') })
  idTrabajador: string;

  @IsBoolean({ message: v.isBoolean('isActive') })
  @IsOptional()
  isActive?: boolean;
}

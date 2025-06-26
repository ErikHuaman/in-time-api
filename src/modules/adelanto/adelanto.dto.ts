import {
  IsString,
  IsBoolean,
  IsOptional,
  IsNotEmpty,
  IsUUID,
  IsNumber,
} from 'class-validator';
import { ValidationMessages as v }  from '@common/messages/validation-messages';

export class AdelantoDTO {
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

  @IsNumber({}, { message: v.isNumber('montoAdelanto') })
  @IsNotEmpty({ message: v.isNotEmpty('montoAdelanto') })
  montoAdelanto: number;

  @IsNumber({}, { message: v.isNumber('cuotasDescuento') })
  @IsNotEmpty({ message: v.isNotEmpty('cuotasDescuento') })
  cuotasDescuento: number;

  @IsNotEmpty({ message: v.isNotEmpty('fechaAdelanto') })
  fechaAdelanto: Date;

  @IsNotEmpty({ message: v.isNotEmpty('fechaDescuento') })
  fechaDescuento: Date;

  @IsBoolean({ message: v.isBoolean('isActive') })
  @IsOptional()
  isActive?: boolean;
}

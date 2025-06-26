import {
  IsString,
  IsBoolean,
  IsOptional,
  IsNotEmpty,
  ValidateIf,
  IsUUID,
  Validate,
} from 'class-validator';
import { ValidationMessages as v }  from '@common/messages/validation-messages';

export class InactivacionTrabajadorDTO {
  @IsUUID('4', { message: v.isUUID('id') })
  @IsOptional()
  id: string;

  @IsUUID('4', { message: v.isUUID('idTrabajador') })
  idTrabajador: string;

  @IsNotEmpty({ message: v.isNotEmpty('motivoSuspension') })
  motivoSuspension: string;

  @IsNotEmpty({ message: v.isNotEmpty('fechaSuspension') })
  fechaSuspension: Date;

  @IsString({ message: v.isString('nota') })
  @IsOptional()
  nota: string;

  @IsBoolean({ message: v.isBoolean('isActive') })
  @IsOptional()
  isActive?: boolean;
}

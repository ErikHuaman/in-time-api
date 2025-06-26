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
import { IsUnique } from '@common/validators/is-unique/is-unique.decorator';
import { TiempoContrato } from './tiempo-contrato.model';

export class TiempoContratoDTO {
  @IsUUID('4', { message: v.isUUID('id') })
  @IsOptional()
  id: string;

  @IsString({ message: v.isString('nombre') })
  @IsNotEmpty({ message: v.isNotEmpty('nombre') })
  @IsUnique(TiempoContrato, 'nombre', { message: v.isUnique('nombre') })
  nombre: string;
}

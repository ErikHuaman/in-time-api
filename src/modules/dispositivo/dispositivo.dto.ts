import {
  IsString,
  IsBoolean,
  IsOptional,
  IsNotEmpty,
  IsUUID,
} from 'class-validator';
import { ValidationMessages as v }  from '@common/messages/validation-messages';

export class DispositivoDTO {
  @IsUUID('4', { message: v.isUUID('id') })
  @IsOptional()
  id: string;

  @IsString({ message: v.isString('nombre') })
  @IsNotEmpty({ message: v.isNotEmpty('nombre') })
  nombre: string;

  @IsUUID('4', { message: v.isUUID('idSede') })
  idSede: string;

  @IsString({ message: v.isString('codigo') })
  @IsNotEmpty({ message: v.isNotEmpty('codigo') })
  codigo: string;

  @IsBoolean({ message: v.isBoolean('isActive') })
  @IsOptional()
  isActive?: boolean;
}

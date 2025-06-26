import {
  IsString,
  IsBoolean,
  IsOptional,
  IsNotEmpty,
  IsUUID,
} from 'class-validator';
import { ValidationMessages as v }  from '@common/messages/validation-messages';
export class ReemplaceroDTO {
  @IsUUID('4', { message: v.isUUID('id') })
  @IsOptional()
  id: string;

  @IsString({ message: v.isString('nombres') })
  @IsNotEmpty({ message: v.isNotEmpty('nombres') })
  nombres: string;

  @IsString({ message: v.isString('dni') })
  @IsNotEmpty({ message: v.isNotEmpty('dni') })
  dni: string;

  @IsString({ message: v.isString('codigo') })
  @IsNotEmpty({ message: v.isNotEmpty('codigo') })
  @IsOptional()
  codigo: string;

  @IsString({ message: v.isString('archivoNombre') })
  @IsNotEmpty({ message: v.isNotEmpty('archivoNombre') })
  @IsOptional()
  archivoNombre: string;

  @IsBoolean({ message: v.isBoolean('isActive') })
  @IsOptional()
  isActive?: boolean;
}

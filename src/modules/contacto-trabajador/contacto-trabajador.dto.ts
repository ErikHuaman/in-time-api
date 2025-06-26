import {
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';
import { ValidationMessages as v }  from '@common/messages/validation-messages';

export class ContactoTrabajadorDTO {
  @IsUUID('4', { message: v.isUUID('id') })
  @IsOptional()
  id: string;

  @IsString({ message: v.isString('nombre') })
  @IsNotEmpty({ message: v.isNotEmpty('nombre') })
  @IsOptional()
  nombre: string;
  
  @IsString({ message: v.isString('apellido') })
  @IsNotEmpty({ message: v.isNotEmpty('apellido') })
  @IsOptional()
  apellido: string;
  
  @IsString({ message: v.isString('parentezco') })
  @IsNotEmpty({ message: v.isNotEmpty('parentezco') })
  @IsOptional()
  parentezco: string;

  @IsString({ message: v.isString('celular') })
  @IsNotEmpty({ message: v.isNotEmpty('celular') })
  @IsOptional()
  celular: string;

  @IsString({ message: v.isString('correo') })
  @IsNotEmpty({ message: v.isNotEmpty('correo') })
  @IsOptional()
  correo: string;

  @IsUUID('4', { message: v.isUUID('idTrabajador') })
  idTrabajador: string;

  @IsBoolean({ message: v.isBoolean('isActive') })
  @IsOptional()
  isActive?: boolean;
}

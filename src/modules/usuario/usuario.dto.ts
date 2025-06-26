import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';
import { IsUnique } from '@common/validators/is-unique/is-unique.decorator';
import { ValidationMessages as v }  from '@common/messages/validation-messages';
import { Usuario } from './usuario.model';
import { Transform } from 'class-transformer';
import { IsUniqueComposite } from '@common/validators/is-unique-composite/is-unique-composite.decorator';

export class UsuarioDTO {
  @IsOptional()
  @IsUUID('4', { message: v.isUUID('id') })
  id: string;

  @IsOptional()
  @IsNumber({}, { message: v.isNumber('orden') })
  orden?: number;

  @IsString({ message: v.isString('nombre') })
  @IsNotEmpty({ message: v.isNotEmpty('nombre') })
  nombre: string;

  @IsString({ message: v.isString('apellido') })
  @IsNotEmpty({ message: v.isNotEmpty('apellido') })
  apellido: string;

  @IsString({ message: v.isString('username') })
  @IsNotEmpty({ message: v.isNotEmpty('username') })
  @IsUnique(Usuario, 'username', { message: v.isUnique('username') })
  username: string;

  @IsUUID('4', { message: v.isUUID('idTipoDocID') })
  idTipoDocID: string;

  @IsString({ message: v.isString('identificacion') })
  @IsNotEmpty({ message: v.isNotEmpty('identificacion') })
  identificacion: string;

  @IsUniqueComposite(
    {
      model: Usuario,
      fields: ['idTipoDocID', 'identificacion'],
    },
    {
      message:
        'Ya existe un trabajador con ese tipo de documento e identificación',
    },
  )
  readonly uniqueCheck: string;

  @IsString({ message: v.isString('password') })
  @IsNotEmpty({ message: v.isNotEmpty('password') })
  password: string;

  @IsUUID('4', { message: v.isUUID('idRol') })
  idRol: string;

  @IsString({ message: v.isString('nombre') })
  @IsNotEmpty({ message: v.isNotEmpty('nombre') })
  @IsOptional()
  archivoNombre: string;

  @IsBoolean({ message: v.isBoolean('isActive') })
  @Transform(({ value }) => value === 'true' || value === true)
  @IsOptional()
  isActive?: boolean;
}

export class UsuarioUpDTO {
  @IsOptional()
  @IsUUID('4', { message: v.isUUID('id') })
  id: string;

  @IsOptional()
  @IsNumber({}, { message: v.isNumber('orden') })
  orden?: number;

  @IsOptional()
  @IsString({ message: v.isString('nombre') })
  nombre?: string;

  @IsOptional()
  @IsString({ message: v.isString('apellido') })
  apellido?: string;

  @IsOptional()
  @IsString({ message: v.isString('username') })
  @IsUnique(Usuario, 'username', { message: v.isUnique('username') })
  username?: string;

  @IsUUID('4', { message: v.isUUID('idTipoDocID') })
  idTipoDocID: string;

  @IsString({ message: v.isString('identificacion') })
  @IsNotEmpty({ message: v.isNotEmpty('identificacion') })
  identificacion: string;

  @IsUniqueComposite(
    {
      model: Usuario,
      fields: ['idTipoDocID', 'identificacion'],
    },
    {
      message:
        'Ya existe un usuario con ese tipo de documento e identificación',
    },
  )
  readonly uniqueCheck: string;

  @IsOptional()
  @IsString({ message: v.isString('password') })
  password?: string;

  @IsOptional()
  @IsUUID('4', { message: v.isUUID('idRol') })
  idRol?: string;

  @IsString({ message: v.isString('nombre') })
  @IsNotEmpty({ message: v.isNotEmpty('nombre') })
  @IsOptional()
  archivoNombre: string;

  @IsBoolean({ message: v.isBoolean('isActive') })
  @Transform(({ value }) => value === 'true' || value === true)
  @IsOptional()
  isActive?: boolean;
}

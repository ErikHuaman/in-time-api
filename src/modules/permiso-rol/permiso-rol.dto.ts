import { IsString, IsBoolean, IsOptional, IsUUID } from 'class-validator';
import { ValidationMessages as v }  from '@common/messages/validation-messages';

export class PermisoRolDTO {
  @IsUUID('4', { message: v.isUUID('idRol') })
  idRol: string;

  @IsUUID('4', { message: v.isUUID('idModulo') })
  idModulo: string;

  @IsBoolean({ message: v.isBoolean('crear') })
  @IsOptional()
  crear: boolean;

  @IsBoolean({ message: v.isBoolean('leer') })
  @IsOptional()
  leer: boolean;

  @IsBoolean({ message: v.isBoolean('editar') })
  @IsOptional()
  editar: boolean;

  @IsBoolean({ message: v.isBoolean('eliminar') })
  @IsOptional()
  eliminar: boolean;
}

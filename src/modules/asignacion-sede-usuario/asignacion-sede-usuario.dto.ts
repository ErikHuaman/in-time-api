import { IsBoolean, IsOptional, IsNotEmpty, IsUUID } from 'class-validator';
import { ValidationMessages as v }  from '@common/messages/validation-messages';

export class AsignacionSedeUsuarioDTO {
  @IsUUID('4', { message: v.isUUID('id') })
  @IsOptional()
  id: string;

  @IsUUID('4', { message: v.isUUID('idUsuario') })
  idUsuario: string;

  @IsUUID('4', { message: v.isUUID('idSede') })
  idSede: string;

  @IsBoolean({ message: v.isBoolean('isActive') })
  @IsOptional()
  isActive?: boolean;
}

import { IsBoolean, IsOptional, IsNotEmpty, IsUUID } from 'class-validator';
import { ValidationMessages as v }  from '@common/messages/validation-messages';

export class AsignacionSedeDTO {
  @IsUUID('4', { message: v.isUUID('id') })
  @IsOptional()
  id: string;

  @IsUUID('4', { message: v.isUUID('idTrabajador') })
  idTrabajador: string;

  @IsUUID('4', { message: v.isUUID('idSede') })
  idSede: string;

  @IsNotEmpty({ message: v.isNotEmpty('fechaAsignacion') })
  fechaAsignacion: Date;

  @IsBoolean({ message: v.isBoolean('isActive') })
  @IsOptional()
  isActive?: boolean;
}

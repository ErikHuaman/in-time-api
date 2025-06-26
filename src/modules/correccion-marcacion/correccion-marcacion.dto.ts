import {
  IsBoolean,
  IsOptional,
  IsNotEmpty,
  IsUUID,
  IsString,
} from 'class-validator';
import { ValidationMessages as v }  from '@common/messages/validation-messages';

export class CorreccionMarcacionDTO {
  @IsUUID('4', { message: v.isUUID('id') })
  @IsOptional()
  id: string;

  @IsUUID('4', { message: v.isUUID('idAsistencia') })
  @IsNotEmpty({ message: v.isNotEmpty('idAsistencia') })
  idAsistencia: string;

  @IsNotEmpty({ message: v.isNotEmpty('fecha') })
  fecha: Date;

  @IsNotEmpty({ message: v.isNotEmpty('marcacionEntrada') })
  marcacionEntrada: Date;

  @IsNotEmpty({ message: v.isNotEmpty('marcacionSalida') })
  marcacionSalida: Date;

  @IsString({ message: v.isString('nota') })
  @IsOptional()
  nota: string;

  @IsBoolean({ message: v.isBoolean('isActive') })
  @IsOptional()
  isActive?: boolean;
}

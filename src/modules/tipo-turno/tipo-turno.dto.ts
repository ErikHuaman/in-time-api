import {
  IsString,
  IsBoolean,
  IsOptional,
  IsNotEmpty,
  ValidateIf,
  IsUUID,
  Validate,
  IsNumber,
} from 'class-validator';
import { ValidationMessages as v }  from '@common/messages/validation-messages';
import { IsUnique } from '@common/validators/is-unique/is-unique.decorator';
import { TipoTurno } from './tipo-turno.model';

export class TipoTurnoDTO {
  @IsUUID('4', { message: v.isUUID('id') })
  @IsOptional()
  id: string;

  @IsString({ message: v.isString('nombre') })
  @IsNotEmpty({ message: v.isNotEmpty('nombre') })
  @IsUnique(TipoTurno, 'nombre', { message: v.isUnique('nombre') })
  nombre: string;

  @IsString({ message: v.isString('nombreCorto') })
  @IsNotEmpty({ message: v.isNotEmpty('nombreCorto') })
  @IsUnique(TipoTurno, 'nombreCorto', { message: v.isUnique('nombreCorto') })
  nombreCorto: string;

  @IsNumber({}, { message: v.isNumber('numBloques') })
  @IsOptional()
  numBloques: number;
}

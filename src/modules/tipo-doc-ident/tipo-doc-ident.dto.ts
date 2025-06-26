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
import { TipoDocIdent } from './tipo-doc-ident.model';

export class TipoDocIdentDTO {
  @IsUUID('4', { message: v.isUUID('id') })
  @IsOptional()
  id: string;

  @IsString({ message: v.isString('nombre') })
  @IsNotEmpty({ message: v.isNotEmpty('nombre') })
  @IsUnique(TipoDocIdent, 'nombre', { message: v.isUnique('nombre') })
  nombre: string;
}

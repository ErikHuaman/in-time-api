import {
  IsString,
  IsBoolean,
  IsOptional,
  IsNotEmpty,
  IsUUID,
} from 'class-validator';
import { ValidationMessages as v }  from '@common/messages/validation-messages';
import { IsUnique } from '@common/validators/is-unique/is-unique.decorator';
import { Cargo } from './cargo.model';

export class CargoDTO {
  @IsUUID('4', { message: v.isUUID('id') })
  @IsOptional()
  id: string;

  @IsString({ message: v.isString('nombre') })
  @IsNotEmpty({ message: v.isNotEmpty('nombre') })
  @IsUnique(Cargo, 'nombre', { message: v.isUnique('nombre') })
  nombre: string;

  @IsBoolean({ message: v.isBoolean('isEditable') })
  @IsOptional()
  isEditable?: boolean;

   @IsBoolean({ message: v.isBoolean('isDescansero') })
  @IsOptional()
  isDescansero?: boolean;

  @IsBoolean({ message: v.isBoolean('isActive') })
  @IsOptional()
  isActive?: boolean;
}

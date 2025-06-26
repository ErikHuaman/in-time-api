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
import { SeguroSalud } from './seguro-salud.model';

export class SeguroSaludDTO {
  @IsUUID('4', { message: v.isUUID('id') })
    @IsOptional()
    id: string;
  
    @IsString({ message: v.isString('nombre') })
    @IsNotEmpty({ message: v.isNotEmpty('nombre') })
    @IsUnique(SeguroSalud, 'nombre', { message: v.isUnique('nombre') })
    nombre: string;

    @IsBoolean({ message: v.isBoolean('esFijo') })
    @IsOptional()
    esFijo: boolean;
  
    @IsNumber({}, { message: v.isNumber('valor') })
    @IsNotEmpty({ message: v.isNotEmpty('valor') })
    valor: number;
}

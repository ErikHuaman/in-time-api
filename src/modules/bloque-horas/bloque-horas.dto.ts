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
import { BloqueHoras } from './bloque-horas.model';
import { IsUniqueComposite } from '@common/validators/is-unique-composite/is-unique-composite.decorator';

export class BloqueHorasDTO {
  @IsUUID('4', { message: v.isUUID('id') })
  @IsOptional()
  id: string;

  @IsNumber({}, { message: v.isNumber('horaEntrada') })
  @IsNotEmpty({ message: v.isNotEmpty('horaEntrada') })
  horaEntrada: number;

  @IsNumber({}, { message: v.isNumber('minutoEntrada') })
  @IsNotEmpty({ message: v.isNotEmpty('minutoEntrada') })
  minutoEntrada: number;

  @IsNumber({}, { message: v.isNumber('horaSalida') })
  @IsNotEmpty({ message: v.isNotEmpty('horaSalida') })
  horaSalida: number;

  @IsNumber({}, { message: v.isNumber('minutoSalida') })
  @IsNotEmpty({ message: v.isNotEmpty('minutoSalida') })
  minutoSalida: number;

  @IsString({ message: v.isString('bgColor') })
  @IsNotEmpty({ message: v.isNotEmpty('bgColor') })
  bgColor: string;

  @IsString({ message: v.isString('textColor') })
  @IsNotEmpty({ message: v.isNotEmpty('textColor') })
  textColor: string;

  @IsString({ message: v.isString('borderColor') })
  @IsNotEmpty({ message: v.isNotEmpty('borderColor') })
  borderColor: string;

  @IsUniqueComposite(
      {
        model: BloqueHoras,
        fields: ['horaEntrada', 'minutoEntrada', 'horaSalida', 'minutoSalida'],
      },
      {
        message:
          'Ya existe un bloque horario con estas horas',
      },
    )
    readonly uniqueCheck: string;

  @IsBoolean({ message: v.isBoolean('isActive') })
  @IsOptional()
  isActive?: boolean;
}

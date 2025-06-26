import {
  IsString,
  IsBoolean,
  IsOptional,
  IsNotEmpty,
  IsUUID,
} from 'class-validator';
import { ValidationMessages as v }  from '@common/messages/validation-messages';

export class FeriadoDTO {
  @IsUUID('4', { message: v.isUUID('id') })
  @IsOptional()
  id?: string;

  @IsString({ message: v.isString('title') })
  @IsNotEmpty({ message: v.isNotEmpty('title') })
  title: string;

  @IsNotEmpty({ message: v.isNotEmpty('start') })
  start: Date;

  @IsOptional()
  end?: Date;

  @IsBoolean({ message: v.isBoolean('isActive') })
  @IsOptional()
  recurrente?: boolean;
}

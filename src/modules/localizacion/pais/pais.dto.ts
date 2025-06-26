import { IsString, IsOptional, IsNotEmpty, IsUUID } from 'class-validator';
import { ValidationMessages as v }  from '@common/messages/validation-messages';

export class PaisDTO {
  @IsUUID('4', { message: v.isUUID('id') })
  @IsOptional()
  id: string;

  @IsString({ message: v.isString('name') })
  @IsNotEmpty({ message: v.isNotEmpty('name') })
  name: string;

  @IsString({ message: v.isString('iso3') })
  @IsNotEmpty({ message: v.isNotEmpty('iso3') })
  iso3: string;

  @IsString({ message: v.isString('iso2') })
  @IsNotEmpty({ message: v.isNotEmpty('iso2') })
  iso2: string;
}

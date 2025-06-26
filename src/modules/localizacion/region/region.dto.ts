import { IsString, IsOptional, IsNotEmpty, IsUUID } from 'class-validator';
import { ValidationMessages as v }  from '@common/messages/validation-messages';

export class RegionDTO {
  @IsUUID('4', { message: v.isUUID('id') })
  @IsOptional()
  id: string;

  @IsString({ message: v.isString('name') })
  @IsNotEmpty({ message: v.isNotEmpty('name') })
  name: string;

  @IsString({ message: v.isString('stateCode') })
  @IsNotEmpty({ message: v.isNotEmpty('stateCode') })
  stateCode: string;

  @IsUUID('4', { message: v.isUUID('idCountry') })
  idCountry: string;
}

import { IsString, IsOptional, IsNotEmpty, IsUUID } from 'class-validator';
import { ValidationMessages as v }  from '@common/messages/validation-messages';

export class ProvinciaDTO {
  @IsUUID('4', { message: v.isUUID('id') })
  @IsOptional()
  id: string;

  @IsString({ message: v.isString('name') })
  @IsNotEmpty({ message: v.isNotEmpty('name') })
  name: string;

  @IsUUID('4', { message: v.isUUID('idState') })
  idState: string;
}

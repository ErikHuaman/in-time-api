import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';
import { ValidationMessages as v }  from '@common/messages/validation-messages';
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';

export class AuthDTO {
  @ApiProperty({default: 'b.alva'})
  @IsString({ message: v.isString('username') })
  @IsNotEmpty({ message: v.isNotEmpty('username') })
  username: string;

  @ApiProperty({default: '12345678'})
  @IsString({ message: v.isString('password') })
  @IsNotEmpty({ message: v.isNotEmpty('password') })
  password: string;

  @ApiProperty({ description: 'Mantener abierta la sesión' })
  @IsBoolean({ message: v.isBoolean('rememberMe') })
  @IsNotEmpty({ message: v.isNotEmpty('rememberMe') })
  @Transform(({ value }) => value === 'true' || value === true)
  rememberMe: boolean;
}

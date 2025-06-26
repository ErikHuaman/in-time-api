import {
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';
import { ValidationMessages as v }  from '@common/messages/validation-messages';
import { Trabajador } from './trabajador.model';
import { IsUniqueComposite } from '@common/validators/is-unique-composite/is-unique-composite.decorator';

export class TrabajadorDTO {
  @IsUUID('4', { message: v.isUUID('id') })
  @IsOptional()
  id: string;

  @IsString({ message: v.isString('nombre') })
  @IsNotEmpty({ message: v.isNotEmpty('nombre') })
  nombre: string;

  @IsString({ message: v.isString('apellido') })
  @IsNotEmpty({ message: v.isNotEmpty('apellido') })
  apellido: string;

  @IsString({ message: v.isString('genero') })
  @IsNotEmpty({ message: v.isNotEmpty('genero') })
  genero: string;

  @IsUUID('4', { message: v.isUUID('idPais') })
  idPais: string;

  @IsUUID('4', { message: v.isUUID('idTipoDocID') })
  idTipoDocID: string;

  @IsString({ message: v.isString('identificacion') })
  @IsNotEmpty({ message: v.isNotEmpty('identificacion') })
  identificacion: string;

  @IsUniqueComposite(
    {
      model: Trabajador,
      fields: ['idTipoDocID', 'identificacion'],
    },
    {
      message:
        'Ya existe un trabajador con ese tipo de documento e identificación',
    },
  )
  readonly uniqueCheck: string;

  @IsUUID('4', { message: v.isUUID('idEstadoCivil') })
  idEstadoCivil: string;

  @IsBoolean({ message: v.isBoolean('isActive') })
  @IsOptional()
  isActive?: boolean;
}

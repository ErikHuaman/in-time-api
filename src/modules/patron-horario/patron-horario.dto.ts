import {
  IsString,
  IsBoolean,
  IsOptional,
  IsNotEmpty,
  IsUUID,
  IsNumber,
} from 'class-validator';
import { ValidationMessages as v }  from '@common/messages/validation-messages';
import { IsUniqueComposite } from '@common/validators/is-unique-composite/is-unique-composite.decorator';
import { PatronHorario } from './patron-horario.model';

export class PatronHorarioDTO {
  @IsUUID('4', { message: v.isUUID('id') })
  @IsOptional()
  id: string;

  @IsString({ message: v.isString('nombre') })
  @IsNotEmpty({ message: v.isNotEmpty('nombre') })
  nombre: string;

  @IsUUID('4', { message: v.isUUID('idTipoTurno') })
  @IsNotEmpty({ message: v.isNotEmpty('idTipoTurno') })
  idTipoTurno: string;

  @IsUniqueComposite(
      {
        model: PatronHorario,
        fields: ['nombre', 'idTipoTurno'],
      },
      {
        message:
          'Ya existe un patrón de horario con el nombre y turno seleccionado',
      },
    )
    readonly uniqueCheck: string;

  @IsBoolean({ message: v.isBoolean('isActive') })
  @IsOptional()
  isActive?: boolean;
}

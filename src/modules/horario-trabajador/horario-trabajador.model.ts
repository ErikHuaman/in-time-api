import {
  BelongsTo,
  Column,
  DataType,
  Default,
  DefaultScope,
  DeletedAt,
  ForeignKey,
  HasMany,
  Index,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { Asistencia } from '@modules/asistencia/asistencia.model';
import { HorarioTrabajadorItem } from '@modules/horario-trabajador-item/horario-trabajador-item.model';
import { PatronHorario } from '@modules/patron-horario/patron-horario.model';
import { TipoTurno } from '@modules/tipo-turno/tipo-turno.model';
import { Trabajador } from '@modules/trabajador/trabajador.model';
import { TurnoTrabajo } from '@modules/turno-trabajo/turno-trabajo.model';

@DefaultScope(() => ({
  attributes: { exclude: ['deletedAt'] }, // Excluir campo de eliminación lógica por defecto
}))
@Table({
  tableName: 'horarioTrabajador',
  paranoid: true,
  timestamps: true,
})
export class HorarioTrabajador extends Model {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column({
    field: 'id',
    type: DataType.UUID,
  })
  declare id: string;

  @Index({ unique: true })
  @Column({
    field: 'orden',
    allowNull: false,
    type: DataType.INTEGER,
  })
  orden: number;

  @ForeignKey(() => Trabajador)
  @Column({
    field: 'idTrabajador',
    allowNull: false,
    type: DataType.UUID,
  })
  idTrabajador: string;

  @BelongsTo(() => Trabajador)
  trabajador: Trabajador;

  @ForeignKey(() => TurnoTrabajo)
  @Column({
    field: 'idTurnoTrabajo',
    allowNull: false,
    type: DataType.UUID,
  })
  idTurnoTrabajo: string;

  @BelongsTo(() => TurnoTrabajo)
  turno: TurnoTrabajo;

  @ForeignKey(() => TipoTurno)
  @Column({
    field: 'idTipoTurno',
    allowNull: false,
    type: DataType.UUID,
  })
  idTipoTurno: string;

  @BelongsTo(() => TipoTurno)
  tipoTurno: TipoTurno;

  @ForeignKey(() => PatronHorario)
  @Column({
    field: 'idPatronHorario',
    allowNull: true,
    type: DataType.UUID,
  })
  idPatronHorario: string;

  @BelongsTo(() => PatronHorario)
  patron: PatronHorario;

  @HasMany(() => HorarioTrabajadorItem)
  items: HorarioTrabajadorItem[];

  @HasMany(() => Asistencia)
  asistencias: Asistencia[];

  @Column({
    field: 'isActive',
    defaultValue: true,
    type: DataType.BOOLEAN,
  })
  isActive: boolean;

  @DeletedAt
  declare deletedAt: Date;
}

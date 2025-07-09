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
import { BloqueHoras } from '@modules/bloque-horas/bloque-horas.model';
import { HorarioTrabajador } from '@modules/horario-trabajador/horario-trabajador.model';
import { Sede } from '@modules/sede/sede.model';
import { JustificacionInasistencia } from '@modules/justificacion-inasistencia/justificacion-inasistencia.model';

@DefaultScope(() => ({
  attributes: { exclude: ['deletedAt'] }, // Excluir campo de eliminación lógica por defecto
}))
@Table({
  tableName: 'horarioTrabajadorItem',
  paranoid: true,
  timestamps: true,
})
export class HorarioTrabajadorItem extends Model {
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

  @Column({
    field: 'numDia',
    allowNull: false,
    type: DataType.INTEGER,
  })
  numDia: number;

  @Column({
    field: 'numDiaSalida',
    allowNull: false,
    type: DataType.INTEGER,
  })
  numDiaSalida: number;

  @Column({
    field: 'numTurno',
    allowNull: false,
    type: DataType.INTEGER,
  })
  numTurno: number;

  @Column({
    field: 'diaLibre',
    allowNull: false,
    type: DataType.BOOLEAN,
  })
  diaLibre: boolean;

  @Column({
    field: 'diaDescanso',
    allowNull: false,
    type: DataType.BOOLEAN,
  })
  diaDescanso: boolean;

  @ForeignKey(() => BloqueHoras)
  @Column({
    field: 'idBloqueHoras',
    allowNull: true,
    type: DataType.UUID,
  })
  idBloqueHoras: string;

  @BelongsTo(() => BloqueHoras, { as: 'bloque', foreignKey: 'idBloqueHoras' })
  bloque: BloqueHoras;

  @ForeignKey(() => HorarioTrabajador)
  @Column({
    field: 'idHorarioTrabajador',
    allowNull: false,
    type: DataType.UUID,
  })
  idHorarioTrabajador: string;

  @BelongsTo(() => HorarioTrabajador)
  horarioTrabajador: HorarioTrabajador;

  @ForeignKey(() => Sede)
  @Column({
    field: 'idSede',
    allowNull: true,
    type: DataType.UUID,
  })
  idSede: string;

  @BelongsTo(() => Sede)
  sede: Sede;

  @HasMany(() => Asistencia)
  asistencias: Asistencia[];

  @HasMany(() => JustificacionInasistencia)
  justificaciones: JustificacionInasistencia[];

  @Column({
    field: 'isActive',
    defaultValue: true,
    type: DataType.BOOLEAN,
  })
  isActive: boolean;

  @DeletedAt
  declare deletedAt: Date;
}

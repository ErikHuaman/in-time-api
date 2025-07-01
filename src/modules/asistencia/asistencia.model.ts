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
import { Dispositivo } from '@modules/dispositivo/dispositivo.model';
import { HorarioTrabajadorItem } from '@modules/horario-trabajador-item/horario-trabajador-item.model';
import { HorarioTrabajador } from '@modules/horario-trabajador/horario-trabajador.model';
import { Trabajador } from '@modules/trabajador/trabajador.model';
import { CorreccionMarcacion } from '@modules/correccion-marcacion/correccion-marcacion.model';

@DefaultScope(() => ({
  attributes: { exclude: ['deletedAt'] }, // Excluir campo de eliminación lógica por defecto
}))
@Table({
  tableName: 'asistencia',
  paranoid: true,
  timestamps: true,
})
export class Asistencia extends Model {
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

  @ForeignKey(() => Dispositivo)
  @Column({
    field: 'idDispositivo',
    allowNull: true,
    type: DataType.UUID,
  })
  idDispositivo: string;

  @BelongsTo(() => Dispositivo)
  dispositivo: Dispositivo;

  @ForeignKey(() => Trabajador)
  @Column({
    field: 'idTrabajador',
    allowNull: true,
    type: DataType.UUID,
  })
  idTrabajador: string;

  @BelongsTo(() => Trabajador)
  trabajador: Trabajador;

  @ForeignKey(() => HorarioTrabajador)
  @Column({
    field: 'idHorarioTrabajador',
    allowNull: true,
    type: DataType.UUID,
  })
  idHorarioTrabajador: string;

  @BelongsTo(() => HorarioTrabajador)
  horarioTrabajador: HorarioTrabajador;

  @ForeignKey(() => HorarioTrabajadorItem)
  @Column({
    field: 'idHorarioTrabajadorItem',
    allowNull: true,
    type: DataType.UUID,
  })
  idHorarioTrabajadorItem: string | null;

  @BelongsTo(() => HorarioTrabajadorItem)
  horarioTrabajadorItem: HorarioTrabajadorItem;

  @Column({
    field: 'fecha',
    allowNull: false,
    type: DataType.DATE,
  })
  fecha: Date;

  @Column({
    field: 'marcacionEntrada',
    allowNull: true,
    type: DataType.DATE,
  })
  marcacionEntrada: Date | null;

  @Column({
    field: 'diferenciaEntrada',
    allowNull: true,
    defaultValue: 0,
    type: DataType.FLOAT,
  })
  diferenciaEntrada: number | null;

  @Column({
    field: 'marcacionSalida',
    allowNull: true,
    type: DataType.DATE,
  })
  marcacionSalida: Date | null;

  @Column({
    field: 'diferenciaSalida',
    allowNull: true,
    defaultValue: 0,
    type: DataType.FLOAT,
  })
  diferenciaSalida: number | null;

  @Column({
    field: 'latitudEntrada',
    allowNull: true,
    type: DataType.STRING,
  })
  latitudEntrada: string | null;

  @Column({
    field: 'longitudEntrada',
    allowNull: true,
    type: DataType.STRING,
  })
  longitudEntrada: string | null;

  @Column({
    field: 'latitudSalida',
    allowNull: true,
    type: DataType.STRING,
  })
  latitudSalida: string | null;

  @Column({
    field: 'longitudSalida',
    allowNull: true,
    type: DataType.STRING,
  })
  longitudSalida: string | null;

  @HasMany(() => CorreccionMarcacion, { onDelete: 'CASCADE', hooks: true })
  correcciones: CorreccionMarcacion[];

  @Column({
    field: 'isActive',
    defaultValue: true,
    type: DataType.BOOLEAN,
  })
  isActive: boolean;

  @DeletedAt
  declare deletedAt: Date;
}

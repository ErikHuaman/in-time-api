import {
  BelongsTo,
  Column,
  DataType,
  Default,
  DefaultScope,
  DeletedAt,
  ForeignKey,
  Index,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { Trabajador } from '@modules/trabajador/trabajador.model';
import { TurnoTrabajo } from '@modules/turno-trabajo/turno-trabajo.model';
@DefaultScope(() => ({
  attributes: { exclude: ['deletedAt'] }, // Excluir campo de eliminación lógica por defecto
}))
@Table({
  tableName: 'controlTrabajador',
  paranoid: true,
  timestamps: true,
})
export class ControlTrabajador extends Model {
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

  @ForeignKey(() => TurnoTrabajo)
  @Column({
    field: 'idTurnoTrabajo',
    allowNull: true,
    type: DataType.UUID,
  })
  idTurnoTrabajo: string;

  @BelongsTo(() => TurnoTrabajo)
  turnoTrabajo: TurnoTrabajo;

  @ForeignKey(() => Trabajador)
  @Column({
    field: 'idTrabajador',
    allowNull: false,
    type: DataType.UUID,
  })
  idTrabajador: string;

  @BelongsTo(() => Trabajador)
  trabajador: Trabajador;

  @Column({
    field: 'marcacionAutomatica',
    defaultValue: false,
    type: DataType.BOOLEAN,
  })
  marcacionAutomatica: boolean;

  @Column({
    field: 'isActive',
    defaultValue: true,
    type: DataType.BOOLEAN,
  })
  isActive: boolean;

  @DeletedAt
  declare deletedAt: Date;
}

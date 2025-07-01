import { Reemplacero } from '@modules/reemplacero/reemplacero.model';
import { Trabajador } from '@modules/trabajador/trabajador.model';
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

@DefaultScope(() => ({
  attributes: { exclude: ['deletedAt'] }, // Excluir campo de eliminación lógica por defecto
}))
@Table({
  tableName: 'reemplazoHorario',
  paranoid: true,
  timestamps: true,
})
export class ReemplazoHorario extends Model {
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

  @BelongsTo(() => Trabajador, 'idTrabajador')
  trabajador: Trabajador;

  @ForeignKey(() => Reemplacero)
  @Column({
    field: 'idReemplacero',
    allowNull: false,
    type: DataType.UUID,
  })
  idReemplacero: string;

  @BelongsTo(() => Reemplacero, 'idReemplacero')
  reemplacero: Reemplacero;

  @Column({
    field: 'nota',
    allowNull: true,
    type: DataType.STRING,
  })
  nota: string;

  @Column({
    field: 'pago',
    allowNull: true,
    type: DataType.FLOAT,
  })
  pago: number;

  @Column({
    field: 'fechaInicio',
    allowNull: false,
    type: DataType.DATE,
  })
  fechaInicio: Date;

  @Column({
    field: 'fechaFin',
    allowNull: false,
    type: DataType.DATE,
  })
  fechaFin: Date;

  @Column({
    field: 'isActive',
    defaultValue: true,
    type: DataType.BOOLEAN,
  })
  isActive: boolean;

  @DeletedAt
  declare deletedAt: Date;
}

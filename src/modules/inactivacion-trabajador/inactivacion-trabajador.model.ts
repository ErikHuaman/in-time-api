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

@DefaultScope(() => ({
  attributes: { exclude: ['deletedAt'] }, // Excluir campo de eliminación lógica por defecto
}))
@Table({
  tableName: 'inactivacionTrabajador',
  paranoid: true,
  timestamps: true,
})
export class InactivacionTrabajador extends Model {
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

  @Column({
    field: 'motivoSuspension',
    allowNull: false,
    type: DataType.STRING,
  })
  motivoSuspension: string;

  @Column({
    field: 'fechaInicio',
    allowNull: false,
    type: DataType.DATE,
  })
  fechaInicio: Date;

  @Column({
    field: 'fechaFin',
    allowNull: true,
    type: DataType.DATE,
  })
  fechaFin: Date;

  @Column({
    field: 'nota',
    allowNull: true,
    type: DataType.STRING,
  })
  nota: string;

  @Column({
    field: 'isActive',
    defaultValue: true,
    type: DataType.BOOLEAN,
  })
  isActive: boolean;

  @DeletedAt
  declare deletedAt: Date;
}

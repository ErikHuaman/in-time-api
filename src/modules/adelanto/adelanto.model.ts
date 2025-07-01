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
import { Cargo } from '@modules/cargo/cargo.model';
import { Sede } from '@modules/sede/sede.model';
import { Trabajador } from '@modules/trabajador/trabajador.model';

@DefaultScope(() => ({
  attributes: { exclude: ['deletedAt'] }, // Excluir campo de eliminación lógica por defecto
}))
@Table({
  tableName: 'adelanto',
  paranoid: true,
  timestamps: true,
})
export class Adelanto extends Model {
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

  @ForeignKey(() => Sede)
  @Column({
    field: 'idSede',
    allowNull: true,
    type: DataType.UUID,
  })
  idSede: string;

  @BelongsTo(() => Sede)
  sede: Sede;

  @ForeignKey(() => Cargo)
  @Column({
    field: 'idCargo',
    allowNull: true,
    type: DataType.UUID,
  })
  idCargo: string;

  @BelongsTo(() => Cargo)
  cargo: Cargo;

  @ForeignKey(() => Trabajador)
  @Column({
    field: 'idTrabajador',
    allowNull: true,
    type: DataType.UUID,
  })
  idTrabajador: string;

  @BelongsTo(() => Trabajador)
  trabajador: Trabajador;

  @Column({
    field: 'montoAdelanto',
    allowNull: true,
    type: DataType.FLOAT,
  })
  montoAdelanto: number;

  @Column({
    field: 'cuotasDescuento',
    allowNull: true,
    type: DataType.INTEGER,
  })
  cuotasDescuento: number;

  @Column({
    field: 'fechaAdelanto',
    allowNull: false,
    type: DataType.DATE,
  })
  fechaAdelanto: Date;

  @Column({
    field: 'fechaDescuento',
    allowNull: false,
    type: DataType.DATE,
  })
  fechaDescuento: Date;

  @Column({
    field: 'isActive',
    defaultValue: true,
    type: DataType.BOOLEAN,
  })
  isActive: boolean;

  @DeletedAt
  declare deletedAt: Date;
}

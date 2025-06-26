import {
  BelongsTo,
  Column,
  DataType,
  Default,
  DeletedAt,
  ForeignKey,
  HasMany,
  Index,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { Cargo } from '@modules/cargo/cargo.model';
import { Sede } from '@modules/sede/sede.model';
import { Trabajador } from '@modules/trabajador/trabajador.model';

@Table({
  tableName: 'permisoTrabajador',
  paranoid: true,
  timestamps: true,
})
export class PermisoTrabajador extends Model {
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
    field: 'nota',
    allowNull: true,
    type: DataType.STRING,
  })
  nota: string;

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
    field: 'conGoce',
    defaultValue: true,
    type: DataType.BOOLEAN,
  })
  conGoce: boolean;

  @Column({
    field: 'incluirExtra',
    defaultValue: true,
    type: DataType.BOOLEAN,
  })
  incluirExtra: boolean;

  @Column({
    field: 'archivo',
    allowNull: false,
    type: DataType.BLOB('long'),
  })
  archivo: Buffer;

  @Column({
    field: 'isActive',
    defaultValue: true,
    type: DataType.BOOLEAN,
  })
  isActive: boolean;

  @DeletedAt
  declare deletedAt: Date;
}

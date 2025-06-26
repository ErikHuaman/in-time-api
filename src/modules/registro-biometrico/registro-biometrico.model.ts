import {
  BelongsTo,
  Column,
  DataType,
  Default,
  DeletedAt,
  ForeignKey,
  Index,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { Trabajador } from '@modules/trabajador/trabajador.model';

@Table({
  tableName: 'registroBiometrico',
  paranoid: true,
  timestamps: true,
})
export class RegistroBiometrico extends Model {
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
    field: 'nombre',
    allowNull: true,
  })
  archivoNombre: string;

  @Column({
    field: 'archivo',
    allowNull: true,
    type: DataType.BLOB('long'),
  })
  archivo: Buffer;

  @Column({
    type: DataType.JSON,
    allowNull: true,
  })
  descriptor: number[];

  @Column({
    field: 'codigo',
    allowNull: true,
    type: DataType.STRING,
  })
  codigo: string;

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
    field: 'isActive',
    defaultValue: true,
    type: DataType.BOOLEAN,
  })
  isActive: boolean;

  @DeletedAt
  declare deletedAt: Date;
}

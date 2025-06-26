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

@Table({
  tableName: 'reemplacero',
  paranoid: true,
  timestamps: true,
})
export class Reemplacero extends Model {
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
    field: 'nombres',
    allowNull: false,
    type: DataType.STRING,
  })
  nombres: string;

  @Column({
    field: 'dni',
    allowNull: false,
    type: DataType.STRING,
  })
  dni: string;

  @Column({
    field: 'codigo',
    allowNull: true,
    type: DataType.STRING,
  })
  codigo: string;

  @Column({
    field: 'archivo',
    allowNull: true,
    type: DataType.BLOB('long'),
  })
  archivo: Buffer;

  @Column({
    field: 'archivoNombre',
    allowNull: true,
    type: DataType.STRING,
  })
  archivoNombre: string;

  @Column({
    type: DataType.JSON,
    allowNull: true,
  })
  descriptor: number[];

  @Column({
    field: 'isActive',
    defaultValue: true,
    type: DataType.BOOLEAN,
  })
  isActive: boolean;

  @DeletedAt
  declare deletedAt: Date;
}

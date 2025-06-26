import {
  Column,
  DataType,
  Default,
  DeletedAt,
  Index,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';

@Table({
  tableName: 'tipoTurno',
  paranoid: true,
  timestamps: true,
})
export class TipoTurno extends Model {
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
    allowNull: false,
    unique: true,
    type: DataType.STRING,
  })
  nombre: string;

  @Column({
    field: 'nombreCorto',
    allowNull: false,
    unique: true,
    type: DataType.STRING,
  })
  nombreCorto: string;

  @Column({
    field: 'numBloques',
    allowNull: false,
    unique: true,
    type: DataType.INTEGER,
  })
  numBloques: number;

  @Column({
    field: 'isActive',
    defaultValue: true,
    type: DataType.BOOLEAN,
  })
  isActive: boolean;

  @DeletedAt
  declare deletedAt: Date;
}

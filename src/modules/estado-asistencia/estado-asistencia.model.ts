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
  tableName: 'estadoAsistencia',
  paranoid: true,
  timestamps: true,
})
export class EstadoAsistencia extends Model {
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
    type: DataType.STRING,
  })
  nombre: string;

  @Column({
    field: 'codigo',
    allowNull: false,
    type: DataType.STRING,
  })
  codigo: string;

  @Column({
    field: 'bgColor',
    allowNull: false,
    type: DataType.STRING,
  })
  bgColor: string;

  @Column({
    field: 'textColor',
    allowNull: false,
    type: DataType.STRING,
  })
  textColor: string;

  @Column({
    field: 'isActive',
    defaultValue: true,
    type: DataType.BOOLEAN,
  })
  isActive: boolean;

  @DeletedAt
  declare deletedAt: Date;
}

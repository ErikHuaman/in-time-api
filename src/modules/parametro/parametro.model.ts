import {
  Column,
  DataType,
  Default,
  DefaultScope,
  Index,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';

@DefaultScope(() => ({
  attributes: { exclude: ['deletedAt'] }, // Excluir campo de eliminación lógica por defecto
}))
@Table({
  tableName: 'parametro',
  paranoid: true,
  timestamps: true,
})
export class Parametro extends Model {
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
    field: 'ruc',
    allowNull: false,
    unique: true,
    type: DataType.STRING,
  })
  ruc: string;

  @Column({
    field: 'razonSocial',
    allowNull: false,
    unique: true,
    type: DataType.STRING,
  })
  razonSocial: string;

  @Column({
    field: 'rubro',
    allowNull: false,
    unique: true,
    type: DataType.STRING,
  })
  rubro: string;

  @Column({
    field: 'direccion',
    allowNull: false,
    type: DataType.STRING,
  })
  direccion: string;

  @Column({
    field: 'porcentaje25',
    allowNull: false,
    type: DataType.FLOAT,
  })
  porcentaje25: number;

  @Column({
    field: 'porcentaje35',
    allowNull: false,
    type: DataType.FLOAT,
  })
  porcentaje35: number;
}

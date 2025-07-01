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
  tableName: 'seguroSalud',
  paranoid: true,
  timestamps: true,
})
export class SeguroSalud extends Model {
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
    field: 'esFijo',
    allowNull: true,
    defaultValue: false,
    type: DataType.BOOLEAN,
  })
  esFijo: boolean;

  @Column({
    field: 'valor',
    allowNull: true,
    type: DataType.FLOAT,
  })
  valor: number;
}

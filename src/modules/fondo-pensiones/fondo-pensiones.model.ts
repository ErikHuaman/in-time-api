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
  tableName: 'fondoPensiones',
  paranoid: true,
  timestamps: true,
})
export class FondoPensiones extends Model {
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
    field: 'seguro',
    allowNull: false,
    type: DataType.FLOAT,
  })
  seguro: number;

  @Column({
    field: 'pension',
    allowNull: true,
    defaultValue: 0,
    type: DataType.FLOAT,
  })
  pension: number;

  @Column({
    field: 'comision',
    allowNull: true,
    defaultValue: 0,
    type: DataType.FLOAT,
  })
  comision: number;

  @Column({
    field: 'esFijo',
    allowNull: true,
    defaultValue: false,
    type: DataType.BOOLEAN,
  })
  esFijo: boolean;
  
}

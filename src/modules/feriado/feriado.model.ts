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
  tableName: 'feriado',
  paranoid: true,
  timestamps: true,
})
export class Feriado extends Model {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column({
    field: 'id',
    type: DataType.UUID,
  })
  declare id: string;

  @Column({
    field: 'nombre',
    allowNull: false,
    type: DataType.STRING,
  })
  title: string;

  @Column({
    field: 'fechaInicio',
    allowNull: false,
    type: DataType.DATE,
  })
  start: Date;

  @Column({
    field: 'fechaFin',
    allowNull: true,
    type: DataType.DATE,
  })
  end: Date;

  @Column({
    field: 'isActive',
    defaultValue: true,
    type: DataType.BOOLEAN,
  })
  isActive: boolean;
}

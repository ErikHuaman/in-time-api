import {
  Column,
  DataType,
  Default,
  Index,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';

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

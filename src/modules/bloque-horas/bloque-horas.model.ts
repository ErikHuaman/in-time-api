import {
  Column,
  DataType,
  Default,
  DefaultScope,
  DeletedAt,
  HasMany,
  Index,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';

@DefaultScope(() => ({
  attributes: { exclude: ['deletedAt'] }, // Excluir campo de eliminación lógica por defecto
}))
@Table({
  tableName: 'bloqueHoras',
  paranoid: true,
  timestamps: true,
  indexes: [
    {
      name: 'unique_hora_entrada_hora_salida',
      unique: true,
      fields: ['horaEntrada', 'minutoEntrada', 'horaSalida', 'minutoSalida'],
    },
  ],
})
export class BloqueHoras extends Model {
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
    field: 'horaEntrada',
    allowNull: false,
    type: DataType.INTEGER,
  })
  horaEntrada: number;

  @Column({
    field: 'minutoEntrada',
    allowNull: false,
    type: DataType.INTEGER,
  })
  minutoEntrada: number;

  @Column({
    field: 'horaSalida',
    allowNull: false,
    type: DataType.INTEGER,
  })
  horaSalida: number;

  @Column({
    field: 'minutoSalida',
    allowNull: false,
    type: DataType.INTEGER,
  })
  minutoSalida: number;

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
    field: 'borderColor',
    allowNull: false,
    type: DataType.STRING,
  })
  borderColor: string;

  @Column({
    field: 'isActive',
    defaultValue: true,
    type: DataType.BOOLEAN,
  })
  isActive: boolean;

  @DeletedAt
  declare deletedAt: Date;
}

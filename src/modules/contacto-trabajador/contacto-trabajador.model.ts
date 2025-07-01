import {
  BelongsTo,
  Column,
  DataType,
  Default,
  DefaultScope,
  DeletedAt,
  ForeignKey,
  Index,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { Trabajador } from '@modules/trabajador/trabajador.model';

@DefaultScope(() => ({
  attributes: { exclude: ['deletedAt'] }, // Excluir campo de eliminación lógica por defecto
}))
@Table({
  tableName: 'contactoTrabajador',
  paranoid: true,
  timestamps: true,
})
export class ContactoTrabajador extends Model {
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
    type: DataType.STRING,
  })
  nombre: string;

  @Column({
    field: 'apellido',
    allowNull: true,
    type: DataType.STRING,
  })
  apellido: string;

  @Column({
    field: 'parentezco',
    allowNull: true,
    type: DataType.STRING,
  })
  parentezco: string;

  @Column({
    field: 'celular',
    allowNull: true,
    type: DataType.STRING,
  })
  celular: string;

  @Column({
    field: 'correo',
    allowNull: true,
    type: DataType.STRING,
  })
  correo: string;

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

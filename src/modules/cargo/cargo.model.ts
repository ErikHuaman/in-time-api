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
import { ContratoTrabajador } from '@modules/contrato-trabajador/contrato-trabajador.model';

@DefaultScope(() => ({
  attributes: { exclude: ['deletedAt'] }, // Excluir campo de eliminación lógica por defecto
}))
@Table({
  tableName: 'cargo',
  paranoid: true,
  timestamps: true,
})
export class Cargo extends Model {
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
    field: 'isEditable',
    defaultValue: true,
    type: DataType.BOOLEAN,
  })
  isEditable: boolean;

  @Column({
    field: 'isDescansero',
    defaultValue: false,
    type: DataType.BOOLEAN,
  })
  isDescansero: boolean;

  @HasMany(() => ContratoTrabajador)
  contratos: ContratoTrabajador[];

  @Column({
    field: 'isActive',
    defaultValue: true,
    type: DataType.BOOLEAN,
  })
  isActive: boolean;

  @DeletedAt
  declare deletedAt: Date;
}

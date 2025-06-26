import {
  Column,
  DataType,
  Default,
  HasMany,
  Index,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { ContratoTrabajador } from '@modules/contrato-trabajador/contrato-trabajador.model';

@Table({
  tableName: 'frecuenciaPago',
  paranoid: true,
  timestamps: true,
})
export class FrecuenciaPago extends Model {
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

  @HasMany(() => ContratoTrabajador)
  contratos: ContratoTrabajador[];
}

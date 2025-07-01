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
import { FondoPensiones } from '@modules/fondo-pensiones/fondo-pensiones.model';
import { SeguroSalud } from '@modules/seguro-salud/seguro-salud.model';

@DefaultScope(() => ({
  attributes: { exclude: ['deletedAt'] }, // Excluir campo de eliminación lógica por defecto
}))
@Table({
  tableName: 'beneficioTrabajador',
  paranoid: true,
  timestamps: true,
})
export class BeneficioTrabajador extends Model {
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
    field: 'pagoFeriado',
    allowNull: true,
    type: DataType.FLOAT,
  })
  pagoFeriado: number;

  @ForeignKey(() => FondoPensiones)
  @Column({
    field: 'idFondoPensiones',
    allowNull: true,
    type: DataType.UUID,
  })
  idFondoPensiones: string;

  @BelongsTo(() => FondoPensiones)
  fondoPensiones: FondoPensiones;

  @ForeignKey(() => SeguroSalud)
  @Column({
    field: 'idSeguroSalud',
    allowNull: true,
    type: DataType.UUID,
  })
  idSeguroSalud: string;

  @BelongsTo(() => SeguroSalud)
  seguro: SeguroSalud;

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

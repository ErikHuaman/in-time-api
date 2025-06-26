import {
  BelongsTo,
  Column,
  DataType,
  Default,
  DeletedAt,
  ForeignKey,
  Index,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { Cargo } from '@modules/cargo/cargo.model';
import { FrecuenciaPago } from '@modules/frecuencia-pago/frecuencia-pago.model';
import { Sede } from '@modules/sede/sede.model';
import { TiempoContrato } from '@modules/tiempo-contrato/tiempo-contrato.model';
import { Trabajador } from '@modules/trabajador/trabajador.model';

@Table({
  tableName: 'contratoTrabajador',
  paranoid: true,
  timestamps: true,
})
export class ContratoTrabajador extends Model {
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
    field: 'numNomina',
    allowNull: true,
    type: DataType.STRING,
  })
  numNomina: string;

  @Column({
    field: 'fechaContrato',
    allowNull: false,
    type: DataType.DATE,
  })
  fechaContrato: Date;

  @Column({
    field: 'fechaInicio',
    allowNull: false,
    type: DataType.DATE,
  })
  fechaInicio: Date;

  @ForeignKey(() => Cargo)
  @Column({
    field: 'idCargo',
    allowNull: false,
    type: DataType.UUID,
  })
  idCargo: string;

  @BelongsTo(() => Cargo)
  cargo: Cargo;

  @ForeignKey(() => TiempoContrato)
  @Column({
    field: 'idTiempoContrato',
    allowNull: false,
    type: DataType.UUID,
  })
  idTiempoContrato: string;

  @BelongsTo(() => TiempoContrato)
  tiempoContrato: TiempoContrato;

  @ForeignKey(() => FrecuenciaPago)
  @Column({
    field: 'idFrecuenciaPago',
    allowNull: false,
    type: DataType.UUID,
  })
  idFrecuenciaPago: string;

  @BelongsTo(() => FrecuenciaPago)
  frecuenciaPago: FrecuenciaPago;

  @Column({
    field: 'horasContrato',
    allowNull: false,
    type: DataType.INTEGER,
  })
  horasContrato: number;

  @Column({
    field: 'salarioMensual',
    allowNull: false,
    type: DataType.FLOAT,
  })
  salarioMensual: number;

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

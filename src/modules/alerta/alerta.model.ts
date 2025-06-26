import { Sede } from '@modules/sede/sede.model';
import { Trabajador } from '@modules/trabajador/trabajador.model';
import { Usuario } from '@modules/usuario/usuario.model';
import {
  BelongsTo,
  Column,
  DataType,
  Default,
  DeletedAt,
  ForeignKey,
  HasMany,
  Index,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';

@Table({
  tableName: 'alertas',
  paranoid: true,
  timestamps: true,
})
export class Alerta extends Model {
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
    field: 'titulo',
    allowNull: false,
    type: DataType.STRING,
  })
  titulo: string;

  @Column({
    field: 'descripcion',
    allowNull: false,
    type: DataType.STRING,
  })
  descripcion: string;

  @ForeignKey(() => Usuario)
  @Column({
    field: 'idUsuario',
    allowNull: true,
    type: DataType.UUID,
  })
  idUsuario: string;

  @BelongsTo(() => Usuario)
  usuario: Usuario;

  @ForeignKey(() => Trabajador)
  @Column({
    field: 'idTrabajador',
    allowNull: true,
    type: DataType.UUID,
  })
  idTrabajador: string;

  @BelongsTo(() => Trabajador)
  trabajador: Trabajador;

  @ForeignKey(() => Sede)
  @Column({
    field: 'idSede',
    allowNull: true,
    type: DataType.UUID,
  })
  idSede: string;

  @BelongsTo(() => Sede)
  sede: Sede;

  @Column({
    field: 'fecha',
    allowNull: true,
    type: DataType.DATE,
  })
  fecha: Date;

  @Column({
    field: 'fechaEntrada',
    allowNull: true,
    type: DataType.DATE,
  })
  fechaEntrada: Date;

  @Column({ defaultValue: false })
  leido: boolean;

  @Column({ defaultValue: true })
  isActive: boolean;

  @DeletedAt
  declare deletedAt: Date;
}

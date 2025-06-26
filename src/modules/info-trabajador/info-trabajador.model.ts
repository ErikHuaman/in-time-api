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
import { Ciudad } from '@modules/localizacion/ciudad/ciudad.model';
import { Trabajador } from '@modules/trabajador/trabajador.model';

@Table({
  tableName: 'infoTrabajador',
  paranoid: true,
  timestamps: true,
})
export class InfoTrabajador extends Model {
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

  @ForeignKey(() => Ciudad)
  @Column({
    field: 'idCiudad',
    allowNull: true,
    type: DataType.UUID,
  })
  idCiudad: string;

  @BelongsTo(() => Ciudad)
  ciudad: Ciudad;

  @Column({
    field: 'direccion',
    allowNull: true,
    type: DataType.STRING,
  })
  direccion: string;

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

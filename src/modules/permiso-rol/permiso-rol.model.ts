import { Modulo } from '@modules/modulo/modulo.model';
import { Rol } from '@modules/rol/rol.model';
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

@Table({
  tableName: 'permisorol',
  paranoid: true,
  timestamps: true,
})
export class PermisoRol extends Model {
  @ForeignKey(() => Rol)
  @Column({
    field: 'idRol',
    allowNull: false,
    type: DataType.UUID,
  })
  idRol: string;

  @ForeignKey(() => Modulo)
  @Column({
    field: 'idModulo',
    allowNull: false,
    type: DataType.UUID,
  })
  idModulo: string;

  @Column({
    field: 'crear',
    allowNull: false,
    defaultValue: false,
    type: DataType.BOOLEAN,
  })
  crear: boolean;

  @Column({
    field: 'leer',
    allowNull: false,
    defaultValue: false,
    type: DataType.BOOLEAN,
  })
  leer: boolean;

  @Column({
    field: 'editar',
    allowNull: false,
    defaultValue: false,
    type: DataType.BOOLEAN,
  })
  editar: boolean;

  @Column({
    field: 'eliminar',
    allowNull: false,
    defaultValue: false,
    type: DataType.BOOLEAN,
  })
  eliminar: boolean;

  @DeletedAt
  declare deletedAt: Date;
}

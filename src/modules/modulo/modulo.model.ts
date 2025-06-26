import { GrupoModulo } from '@modules/grupo-modulo/grupo-modulo.model';
import { PermisoRol } from '@modules/permiso-rol/permiso-rol.model';
import { Rol } from '@modules/rol/rol.model';
import {
  BelongsTo,
  BelongsToMany,
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
  tableName: 'modulo',
  paranoid: true,
  timestamps: true,
})
export class Modulo extends Model {
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
    type: DataType.STRING,
  })
  nombre: string;

  @Column({
    field: 'url',
    allowNull: false,
    type: DataType.STRING,
  })
  url: string;

  @Column({
    field: 'icono',
    allowNull: false,
    type: DataType.STRING,
  })
  icono: string;

  @ForeignKey(() => GrupoModulo)
  @Column({
    field: 'idGrupoModulo',
    allowNull: false,
    type: DataType.UUID,
  })
  idGrupoModulo: string;

  @BelongsTo(() => GrupoModulo)
  grupoModulo: GrupoModulo;

  @BelongsToMany(() => Rol, () => PermisoRol)
  roles: Rol[];

  @Column({
    field: 'isActive',
    defaultValue: true,
    type: DataType.BOOLEAN,
  })
  isActive: boolean;

  @DeletedAt
  declare deletedAt: Date;
}

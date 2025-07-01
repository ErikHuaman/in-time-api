import { GrupoModulo } from '@modules/grupo-modulo/grupo-modulo.model';
import { Modulo } from '@modules/modulo/modulo.model';
import { PermisoRol } from '@modules/permiso-rol/permiso-rol.model';
import { Usuario } from '@modules/usuario/usuario.model';
import {
  BelongsToMany,
  Column,
  DataType,
  Default,
  DefaultScope,
  DeletedAt,
  HasMany,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';

@DefaultScope(() => ({
  attributes: { exclude: ['deletedAt'] }, // Excluir campo de eliminación lógica por defecto
}))
@Table({
  tableName: 'rol',
  paranoid: true,
  timestamps: true,
})
export class Rol extends Model {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  declare id: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    defaultValue: 0,
  })
  orden: number;

  @Column({
    allowNull: false,
    unique: true,
  })
  codigo: string;

  @Column({
    allowNull: false,
  })
  nombre: string;

  @HasMany(() => Usuario)
  usuarios: Usuario[];

  @BelongsToMany(() => Modulo, () => PermisoRol)
  modulos: Modulo[];

  @Column({ defaultValue: true })
  isActive: boolean;

  @DeletedAt
  declare deletedAt: Date;
}

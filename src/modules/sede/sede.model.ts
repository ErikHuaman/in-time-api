import {
  BelongsTo,
  BelongsToMany,
  Column,
  DataType,
  Default,
  DefaultScope,
  DeletedAt,
  ForeignKey,
  HasMany,
  Index,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { AsignacionSede } from '@modules/asignacion-sede/asignacion-sede.model';
import { Ciudad } from '@modules/localizacion/ciudad/ciudad.model';
import { Dispositivo } from '@modules/dispositivo/dispositivo.model';
import { AsignacionSedeUsuario } from '@modules/asignacion-sede-usuario/asignacion-sede-usuario.model';
import { Trabajador } from '@modules/trabajador/trabajador.model';
import { Usuario } from '@modules/usuario/usuario.model';

@DefaultScope(() => ({
  attributes: { exclude: ['deletedAt'] }, // Excluir campo de eliminación lógica por defecto
}))
@Table({
  tableName: 'sedes',
  paranoid: true,
  timestamps: true,
})
export class Sede extends Model {
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
    field: 'ruc',
    allowNull: false,
    type: DataType.STRING,
  })
  ruc: string;

  @Column({
    field: 'razonSocial',
    allowNull: false,
    type: DataType.STRING,
  })
  razonSocial: string;

  @Column({
    field: 'direccion',
    allowNull: false,
    type: DataType.STRING,
  })
  direccion: string;

  @Column({
    field: 'latitud',
    allowNull: false,
    type: DataType.STRING,
  })
  latitud: string;

  @Column({
    field: 'longitud',
    allowNull: false,
    type: DataType.STRING,
  })
  longitud: string;

  @ForeignKey(() => Ciudad)
  @Column({
    field: 'idCiudad',
    allowNull: false,
    type: DataType.UUID,
  })
  idCiudad: string;

  @BelongsTo(() => Ciudad)
  ciudad: Ciudad;

  @BelongsToMany(() => Trabajador, () => AsignacionSede)
  trabajadores: Trabajador[];

  @BelongsToMany(() => Usuario, () => AsignacionSedeUsuario)
  usuarios: Usuario[];

  @HasMany(() => Dispositivo)
  dispositivos: Dispositivo[];

  @Column({
    field: 'isActive',
    defaultValue: true,
    type: DataType.BOOLEAN,
  })
  isActive: boolean;

  @DeletedAt
  declare deletedAt: Date;
}

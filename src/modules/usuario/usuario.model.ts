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
  Model,
  PrimaryKey,
  Scopes,
  Table,
} from 'sequelize-typescript';
import { AsignacionSedeUsuario } from '@modules/asignacion-sede-usuario/asignacion-sede-usuario.model';
import { Rol } from '@modules/rol/rol.model';
import { Sede } from '@modules/sede/sede.model';
import { TipoDocIdent } from '@modules/tipo-doc-ident/tipo-doc-ident.model';

@DefaultScope(() => ({
  attributes: { exclude: ['archivo', 'descriptor', 'password', 'deletedAt'] }, // Excluir campo de eliminación lógica, archivo, descriptor y password por defecto
}))
@Scopes(() => ({
  withPassword: {
    attributes: { include: ['password'] },
  }, // Devolver password para casos especificos
  withArchivo: {
    attributes: { include: ['archivo'] },
  }, // Devolver password para casos especificos
}))
@Table({
  tableName: 'usuario',
  timestamps: true,
  paranoid: true,
})
export class Usuario extends Model {
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
    field: 'nombre',
    allowNull: false,
    type: DataType.STRING,
  })
  nombre: string;

  @Column({
    field: 'apellido',
    allowNull: false,
    type: DataType.STRING,
  })
  apellido: string;

  @Column({
    unique: true,
    field: 'username',
    allowNull: false,
    type: DataType.STRING,
  })
  username: string;

  @ForeignKey(() => TipoDocIdent)
  @Column({
    field: 'idTipoDocID',
    allowNull: false,
    type: DataType.UUID,
  })
  idTipoDocID: string;

  @BelongsTo(() => TipoDocIdent)
  tipoDocID: TipoDocIdent;

  @Column({
    field: 'identificacion',
    allowNull: false,
    type: DataType.STRING,
  })
  identificacion: string;

  @Column
  password: string;

  @ForeignKey(() => Rol)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  idRol: string;

  @BelongsTo(() => Rol)
  rol: Rol;

  @Column({
    field: 'archivoNombre',
    allowNull: true,
  })
  archivoNombre: string;

  @Column({
    field: 'archivo',
    allowNull: true,
    type: DataType.BLOB('long'),
  })
  archivo: Buffer;

  @Column({
    type: DataType.JSON,
    allowNull: true,
  })
  descriptor: number[];

  @ForeignKey(() => Usuario)
  @Column({ type: DataType.UUID, allowNull: true })
  idAdmin: string;

  @BelongsTo(() => Usuario, 'idAdmin')
  admin: Usuario;

  @HasMany(() => Usuario, 'idAdmin')
  subordinados: Usuario[];

  @BelongsToMany(() => Sede, () => AsignacionSedeUsuario)
  sedes: Sede[];

  @Column({ defaultValue: true })
  isActive: boolean;

  @DeletedAt
  declare deletedAt: Date;
}

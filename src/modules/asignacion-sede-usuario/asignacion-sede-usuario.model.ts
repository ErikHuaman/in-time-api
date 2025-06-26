import { Sede } from '@modules/sede/sede.model';
import { Usuario } from '@modules/usuario/usuario.model';
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
  tableName: 'asignacionSedeUsuario',
  paranoid: true,
  timestamps: true,
})
export class AsignacionSedeUsuario extends Model {
  @ForeignKey(() => Usuario)
  @Column({
    field: 'idUsuario',
    allowNull: false,
    type: DataType.UUID,
  })
  idUsuario: string;

  @BelongsTo(() => Usuario)
  usuario: Usuario;

  @ForeignKey(() => Sede)
  @Column({
    field: 'idSede',
    allowNull: false,
    type: DataType.UUID,
  })
  idSede: string;

  @BelongsTo(() => Sede)
  sede: Sede;

  @DeletedAt
  declare deletedAt: Date;
}


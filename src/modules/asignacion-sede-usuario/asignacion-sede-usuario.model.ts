import {
  BelongsTo,
  Column,
  DataType,
  DefaultScope,
  DeletedAt,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Sede } from '@modules/sede/sede.model';
import { Usuario } from '@modules/usuario/usuario.model';

@DefaultScope(() => ({
  attributes: { exclude: ['deletedAt'] }, // Excluir campo de eliminación lógica por defecto
}))
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

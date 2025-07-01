import {
  BelongsTo,
  Column,
  DataType,
  Default,
  DefaultScope,
  DeletedAt,
  ForeignKey,
  Index,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { Sede } from '@modules/sede/sede.model';
import { Trabajador } from '@modules/trabajador/trabajador.model';

@DefaultScope(() => ({
  attributes: { exclude: ['deletedAt'] }, // Excluir campo de eliminación lógica por defecto
}))
@Table({
  tableName: 'asignacionSede',
  paranoid: true,
  timestamps: true,
})
export class AsignacionSede extends Model {

  @ForeignKey(() => Trabajador)
  @Column({
    field: 'idTrabajador',
    allowNull: false,
    type: DataType.UUID,
  })
  idTrabajador: string;

  @BelongsTo(() => Trabajador)
  trabajador: Trabajador;

  @ForeignKey(() => Sede)
  @Column({
    field: 'idSede',
    allowNull: false,
    type: DataType.UUID,
  })
  idSede: string;

  @BelongsTo(() => Sede)
  sede: Sede;

  @Column({
    field: 'fechaAsignacion',
    allowNull: false,
    type: DataType.DATE,
  })
  fechaAsignacion: Date;

  @DeletedAt
  declare deletedAt: Date;
}

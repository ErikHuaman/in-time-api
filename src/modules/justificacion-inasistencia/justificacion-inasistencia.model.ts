import { HorarioTrabajadorItem } from '@modules/horario-trabajador-item/horario-trabajador-item.model';
import { HorarioTrabajador } from '@modules/horario-trabajador/horario-trabajador.model';
import { Trabajador } from '@modules/trabajador/trabajador.model';
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
  Scopes,
  Table,
} from 'sequelize-typescript';

@DefaultScope(() => ({
  attributes: { exclude: ['archivo', 'deletedAt'] }, // Excluir campo de eliminación lógica y archivo por defecto
}))
@Scopes(() => ({
  withArchivo: {
    attributes: { include: ['archivo'] },
  }, // Devolver archivo para casos especificos
}))
@Table({
  tableName: 'justificacionInasistencia',
  paranoid: true,
  timestamps: true,
})
export class JustificacionInasistencia extends Model {
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

  @ForeignKey(() => Trabajador)
  @Column({
    field: 'idTrabajador',
    allowNull: true,
    type: DataType.UUID,
  })
  idTrabajador: string;

  @BelongsTo(() => Trabajador)
  trabajador: Trabajador;

  @ForeignKey(() => HorarioTrabajador)
  @Column({
    field: 'idHorarioTrabajador',
    allowNull: true,
    type: DataType.UUID,
  })
  idHorarioTrabajador: string;

  @BelongsTo(() => HorarioTrabajador)
  horarioTrabajador: HorarioTrabajador;

  @ForeignKey(() => HorarioTrabajadorItem)
  @Column({
    field: 'idHorarioTrabajadorItem',
    allowNull: true,
    type: DataType.UUID,
  })
  idHorarioTrabajadorItem: string;

  @BelongsTo(() => HorarioTrabajadorItem)
  horarioTrabajadorItem: HorarioTrabajadorItem;

  @Column({
    field: 'fecha',

    allowNull: false,
    type: DataType.DATE,
  })
  fecha: Date;

  @Column({
    field: 'nota',
    allowNull: true,
    type: DataType.STRING,
  })
  nota: string;

  @Column({
    field: 'conGoce',
    type: DataType.BOOLEAN,
  })
  conGoce: boolean;

  @Column({
    field: 'incluirExtra',
    type: DataType.BOOLEAN,
  })
  incluirExtra: boolean;

  @Column({
    field: 'archivo',
    allowNull: false,
    type: DataType.BLOB('long'),
  })
  archivo: Buffer;

  @Column({
    field: 'isActive',
    defaultValue: true,
    type: DataType.BOOLEAN,
  })
  isActive: boolean;

  @DeletedAt
  declare deletedAt: Date;
}

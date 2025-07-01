import {
  BelongsTo,
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
import { PatronHorarioItem } from '@modules/patron-horario-item/patron-horario-item.model';
import { TipoTurno } from '@modules/tipo-turno/tipo-turno.model';

@DefaultScope(() => ({
  attributes: { exclude: ['deletedAt'] }, // Excluir campo de eliminación lógica por defecto
}))
@Table({
  tableName: 'patronHorario',
  paranoid: true,
  timestamps: true,
  indexes: [
    {
      name: 'unique_idTipoTurno_nombre',
      unique: true,
      fields: ['nombre', 'idTipoTurno'],
    },
  ],
})
export class PatronHorario extends Model {
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

  @ForeignKey(() => TipoTurno)
  @Column({
    field: 'idTipoTurno',
    allowNull: true,
    type: DataType.UUID,
  })
  idTipoTurno: string;

  @BelongsTo(() => TipoTurno)
  tipoTurno: TipoTurno;

  @HasMany(() => PatronHorarioItem)
  items: PatronHorarioItem[];

  @Column({
    field: 'isActive',
    defaultValue: true,
    type: DataType.BOOLEAN,
  })
  isActive: boolean;

  @DeletedAt
  declare deletedAt: Date;
}

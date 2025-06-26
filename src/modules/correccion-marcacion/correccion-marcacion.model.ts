import { Asistencia } from '@modules/asistencia/asistencia.model';
import {
  BelongsTo,
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
  tableName: 'correccionMarcacion',
  paranoid: true,
  timestamps: true,
})
export class CorreccionMarcacion extends Model {
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

  @ForeignKey(() => Asistencia)
  @Column({
    field: 'idAsistencia',
    allowNull: true,
    type: DataType.UUID,
  })
  idAsistencia: string;

  @BelongsTo(() => Asistencia)
  asistencia: Asistencia;

  @Column({
    field: 'fecha',

    allowNull: false,
    type: DataType.DATE,
  })
  fecha: Date;

  @Column({
    field: 'marcacionEntrada',
    allowNull: true,
    type: DataType.DATE,
  })
  marcacionEntrada: Date;
  @Column({
    field: 'marcacionSalida',
    allowNull: true,
    type: DataType.DATE,
  })
  marcacionSalida: Date;

  @Column({
    field: 'nota',
    allowNull: true,
    type: DataType.STRING,
  })
  nota: string;

  @Column({
    field: 'isActive',
    defaultValue: true,
    type: DataType.BOOLEAN,
  })
  isActive: boolean;

  @DeletedAt
  declare deletedAt: Date;
}

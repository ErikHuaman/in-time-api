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
import { BloqueHoras } from '@modules/bloque-horas/bloque-horas.model';
import { PatronHorario } from '@modules/patron-horario/patron-horario.model';

@DefaultScope(() => ({
  attributes: { exclude: ['deletedAt'] }, // Excluir campo de eliminación lógica por defecto
}))
@Table({
  tableName: 'patronHorarioItem',
  paranoid: true,
  timestamps: true,
})
export class PatronHorarioItem extends Model {
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
    field: 'numDia',
    allowNull: false,
    type: DataType.INTEGER,
  })
  numDia: number;

  @Column({
    field: 'numTurno',
    allowNull: false,
    type: DataType.INTEGER,
  })
  numTurno: number;

  @Column({
    field: 'diaLibre',
    allowNull: false,
    type: DataType.BOOLEAN,
  })
  diaLibre: boolean;

  @Column({
    field: 'diaDescanso',
    allowNull: false,
    type: DataType.BOOLEAN,
  })
  diaDescanso: boolean;

  @ForeignKey(() => BloqueHoras)
  @Column({
    field: 'idBloqueHoras',
    allowNull: true,
    type: DataType.UUID,
  })
  idBloqueHoras: string;

  @BelongsTo(() => BloqueHoras)
  bloque: BloqueHoras;

  @ForeignKey(() => PatronHorario)
  @Column({
    field: 'idPatronHorario',
    allowNull: false,
    type: DataType.UUID,
  })
  idPatronHorario: string;

  @BelongsTo(() => PatronHorario)
  patron: PatronHorario;

  @Column({
    field: 'isActive',
    defaultValue: true,
    type: DataType.BOOLEAN,
  })
  isActive: boolean;

  @DeletedAt
  declare deletedAt: Date;
}

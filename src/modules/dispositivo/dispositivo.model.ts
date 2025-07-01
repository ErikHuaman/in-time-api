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
import { Asistencia } from '@modules/asistencia/asistencia.model';
import { Sede } from '@modules/sede/sede.model';
import { AsistenciaUsuario } from '@modules/asistencia-usuario/asistencia-usuario.model';

@DefaultScope(() => ({
  attributes: { exclude: ['deletedAt'] }, // Excluir campo de eliminación lógica por defecto
}))
@Table({
  tableName: 'dispositivos',
  paranoid: true,
  timestamps: true,
})
export class Dispositivo extends Model {
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
    field: 'codigo',
    allowNull: true,
    unique: true,
    type: DataType.STRING,
  })
  codigo: string;

  @Column({
    field: 'nombre',
    allowNull: false,
    type: DataType.STRING,
  })
  nombre: string;

  @ForeignKey(() => Sede)
  @Column({
    field: 'idSede',
    allowNull: true,
    type: DataType.UUID,
  })
  idSede: string;

  @BelongsTo(() => Sede)
  sede: Sede;

  @HasMany(() => Asistencia)
  asistencias: Asistencia[];

  @HasMany(() => AsistenciaUsuario)
  asistenciasUsuario: AsistenciaUsuario[];

  @Column({
    field: 'isActive',
    defaultValue: true,
    type: DataType.BOOLEAN,
  })
  isActive: boolean;

  @DeletedAt
  declare deletedAt: Date;
}

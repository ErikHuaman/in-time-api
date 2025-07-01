import { Dispositivo } from '@modules/dispositivo/dispositivo.model';
import { Usuario } from '@modules/usuario/usuario.model';
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

@DefaultScope(() => ({
  attributes: { exclude: ['deletedAt'] }, // Excluir campo de eliminación lógica por defecto
}))
@Table({
  tableName: 'asistenciaUsuarios',
  paranoid: true,
  timestamps: true,
})
export class AsistenciaUsuario extends Model {
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

  @ForeignKey(() => Dispositivo)
  @Column({
    field: 'idDispositivo',
    allowNull: true,
    type: DataType.UUID,
  })
  idDispositivo: string;

  @BelongsTo(() => Dispositivo)
  dispositivo: Dispositivo;

  @ForeignKey(() => Usuario)
  @Column({
    field: 'idUsuario',
    allowNull: true,
    type: DataType.UUID,
  })
  idUsuario: string;

  @BelongsTo(() => Usuario)
  usuario: Usuario;

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
  marcacionEntrada: Date | null;

  @Column({
    field: 'marcacionSalida',
    allowNull: true,
    type: DataType.DATE,
  })
  marcacionSalida: Date | null;

  @Column({
    field: 'latitudEntrada',
    allowNull: true,
    type: DataType.STRING,
  })
  latitudEntrada: string;

  @Column({
    field: 'longitudEntrada',
    allowNull: true,
    type: DataType.STRING,
  })
  longitudEntrada: string;

  @Column({
    field: 'latitudSalida',
    allowNull: true,
    type: DataType.STRING,
  })
  latitudSalida: string;

  @Column({
    field: 'longitudSalida',
    allowNull: true,
    type: DataType.STRING,
  })
  longitudSalida: string;

  @Column({
    field: 'isActive',
    defaultValue: true,
    type: DataType.BOOLEAN,
  })
  isActive: boolean;

  @DeletedAt
  declare deletedAt: Date;
}

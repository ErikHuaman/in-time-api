import {
  BelongsTo,
  Column,
  DataType,
  Default,
  DefaultScope,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { Provincia } from '@modules/localizacion/provincia/provincia.model';

@DefaultScope(() => ({
  attributes: { exclude: ['deletedAt'] }, // Excluir campo de eliminación lógica por defecto
}))
@Table({
  tableName: 'ciudades',
  paranoid: true,
  timestamps: true,
})
export class Ciudad extends Model {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column({
    field: 'id',
    type: DataType.UUID,
  })
  declare id: string;

  @Column({
    field: 'name',
    allowNull: false,
    type: DataType.STRING,
  })
  name: string;

  @ForeignKey(() => Provincia)
  @Column({
    field: 'idProvince',
    type: DataType.UUID,
  })
  idProvince: string;

  @BelongsTo(() => Provincia)
  province: Provincia;
}

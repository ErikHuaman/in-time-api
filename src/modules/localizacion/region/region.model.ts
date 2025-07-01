import {
  BelongsTo,
  Column,
  DataType,
  Default,
  DefaultScope,
  ForeignKey,
  HasMany,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { Pais } from '@modules/localizacion/pais/pais.model';
import { Provincia } from '@modules/localizacion/provincia/provincia.model';

@DefaultScope(() => ({
  attributes: { exclude: ['deletedAt'] }, // Excluir campo de eliminación lógica por defecto
}))
@Table({
  tableName: 'regiones',
  paranoid: true,
  timestamps: true,
})
export class Region extends Model {
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

  @Column({
    field: 'stateCode',
    allowNull: false,
    type: DataType.STRING,
  })
  stateCode: string;

  @ForeignKey(() => Pais)
  @Column({
    field: 'idCountry',
    type: DataType.UUID,
  })
  idCountry: string;

  @BelongsTo(() => Pais)
  country: Pais;

  @HasMany(() => Provincia)
  provinces: Provincia[];
}

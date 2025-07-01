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
import { Region } from '@modules/localizacion/region/region.model';
import { Ciudad } from '@modules/localizacion/ciudad/ciudad.model';

@DefaultScope(() => ({
  attributes: { exclude: ['deletedAt'] }, // Excluir campo de eliminación lógica por defecto
}))
@Table({
  tableName: 'provincias',
  paranoid: true,
  timestamps: true,
})
export class Provincia extends Model {
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

  @ForeignKey(() => Region)
  @Column({
    field: 'idState',
    type: DataType.UUID,
  })
  idState: string;

  @BelongsTo(() => Region)
  state: Region;

  @HasMany(() => Ciudad)
  cities: Ciudad[];
}

import {
  Column,
  DataType,
  Default,
  HasMany,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { Region } from '@modules/localizacion/region/region.model';

@Table({
  tableName: 'paises',
  paranoid: true,
  timestamps: true,
})
export class Pais extends Model {
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
    field: 'iso3',
    allowNull: false,
    type: DataType.STRING,
  })
  iso3: string;

  @Column({
    field: 'iso2',
    allowNull: false,
    type: DataType.STRING,
  })
  iso2: string;

  @HasMany(() => Region)
  states: Region[];
  
}

import {
  BelongsTo,
  BelongsToMany,
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
  Scopes,
  Table,
} from 'sequelize-typescript';
import { AsignacionSede } from '@modules/asignacion-sede/asignacion-sede.model';
import { Asistencia } from '@modules/asistencia/asistencia.model';
import { BeneficioTrabajador } from '@modules/beneficio-trabajador/beneficio-trabajador.model';
import { ContactoTrabajador } from '@modules/contacto-trabajador/contacto-trabajador.model';
import { ContratoTrabajador } from '@modules/contrato-trabajador/contrato-trabajador.model';
import { ControlTrabajador } from '@modules/control-trabajador/control-trabajador.model';
import { Pais } from '@modules/localizacion/pais/pais.model';
import { EstadoCivil } from '@modules/estado-civil/estado-civil.model';
import { HorarioTrabajador } from '@modules/horario-trabajador/horario-trabajador.model';
import { InactivacionTrabajador } from '@modules/inactivacion-trabajador/inactivacion-trabajador.model';
import { InfoTrabajador } from '@modules/info-trabajador/info-trabajador.model';
import { RegistroBiometrico } from '@modules/registro-biometrico/registro-biometrico.model';
import { TipoDocIdent } from '@modules/tipo-doc-ident/tipo-doc-ident.model';
import { Vacacion } from '@modules/vacacion/vacacion.model';
import { PermisoTrabajador } from '@modules/permiso-trabajador/permiso-trabajador.model';
import { Sede } from '@modules/sede/sede.model';
import { Adelanto } from '@modules/adelanto/adelanto.model';

@DefaultScope(() => ({
  attributes: { exclude: ['deletedAt'] }, // Excluir campo de eliminación lógica por defecto
}))
@Table({
  tableName: 'trabajador',
  paranoid: true,
  timestamps: true,
  indexes: [
    {
      name: 'unique_doc_ident',
      unique: true,
      fields: ['idTipoDocID', 'identificacion'],
    },
  ],
})
export class Trabajador extends Model {
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

  @Column({
    field: 'apellido',
    allowNull: false,
    type: DataType.STRING,
  })
  apellido: string;

  @Column({
    field: 'genero',
    allowNull: false,
    type: DataType.STRING,
  })
  genero: string;

  @ForeignKey(() => Pais)
  @Column({
    field: 'idPais',
    allowNull: false,
    type: DataType.UUID,
  })
  idPais: string;

  @BelongsTo(() => Pais)
  country: Pais;

  @ForeignKey(() => TipoDocIdent)
  @Column({
    field: 'idTipoDocID',
    allowNull: false,
    type: DataType.UUID,
  })
  idTipoDocID: string;

  @BelongsTo(() => TipoDocIdent)
  tipoDocID: TipoDocIdent;

  @Column({
    field: 'identificacion',
    allowNull: false,
    type: DataType.STRING,
  })
  identificacion: string;

  @ForeignKey(() => EstadoCivil)
  @Column({
    field: 'idEstadoCivil',
    allowNull: false,
    type: DataType.UUID,
  })
  idEstadoCivil: string;

  @BelongsTo(() => EstadoCivil)
  estadoCivil: EstadoCivil;

  @HasMany(() => InfoTrabajador)
  infos: InfoTrabajador[];

  @HasMany(() => ContratoTrabajador)
  contratos: ContratoTrabajador[];

  @HasMany(() => RegistroBiometrico)
  biometricos: RegistroBiometrico[];

  @HasMany(() => ContactoTrabajador)
  contactos: ContactoTrabajador[];

  @HasMany(() => ControlTrabajador)
  controles: ControlTrabajador[];

  @HasMany(() => BeneficioTrabajador)
  beneficios: BeneficioTrabajador[];

  @BelongsToMany(() => Sede, () => AsignacionSede)
  sedes: Sede[];

  @HasMany(() => InactivacionTrabajador)
  inactivaciones: InactivacionTrabajador[];

  @HasMany(() => HorarioTrabajador)
  horarios: HorarioTrabajador[];

  @HasMany(() => Asistencia)
  asistencias: Asistencia[];

  @HasMany(() => Vacacion)
  vacaciones: Vacacion[];

  @HasMany(() => PermisoTrabajador)
  permisos: PermisoTrabajador[];

  @HasMany(() => Adelanto)
  adelantos: Adelanto[];

  @Column({
    field: 'isActive',
    defaultValue: true,
    type: DataType.BOOLEAN,
  })
  isActive: boolean;

  @DeletedAt
  declare deletedAt: Date;
}

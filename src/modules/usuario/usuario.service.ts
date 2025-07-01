import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import * as bcrypt from 'bcryptjs';
import { getNextOrderValue } from '@common/utils/auto-increment.helper';
import { Usuario } from './usuario.model';
import { Rol } from '@modules/rol/rol.model';
import { AsignacionSedeUsuario } from '@modules/asignacion-sede-usuario/asignacion-sede-usuario.model';
import { Sede } from '@modules/sede/sede.model';
import { col, fn, Op, where } from 'sequelize';
import { PaginatedResponse } from '@common/interfaces/paginated-response.interface';
import { UsuarioRepository } from './usuario.repository';
import { Trabajador } from '@modules/trabajador/trabajador.model';
import { ContactoTrabajador } from '@modules/contacto-trabajador/contacto-trabajador.model';
import { InfoTrabajador } from '@modules/info-trabajador/info-trabajador.model';
import { ContratoTrabajador } from '@modules/contrato-trabajador/contrato-trabajador.model';
import { Cargo } from '@modules/cargo/cargo.model';
import { HorarioTrabajador } from '@modules/horario-trabajador/horario-trabajador.model';
import { TurnoTrabajo } from '@modules/turno-trabajo/turno-trabajo.model';
import { HorarioTrabajadorItem } from '@modules/horario-trabajador-item/horario-trabajador-item.model';
import { BloqueHoras } from '@modules/bloque-horas/bloque-horas.model';
import { JustificacionInasistencia } from '@modules/justificacion-inasistencia/justificacion-inasistencia.model';
import { Asistencia } from '@modules/asistencia/asistencia.model';
import { CorreccionMarcacion } from '@modules/correccion-marcacion/correccion-marcacion.model';
import { Vacacion } from '@modules/vacacion/vacacion.model';
import { PermisoTrabajador } from '@modules/permiso-trabajador/permiso-trabajador.model';

@Injectable()
export class UsuarioService {
  constructor(private readonly repository: UsuarioRepository) {}

  async findAll(
    user: Usuario,
    limit: number,
    offset: number,
    filter?: boolean,
    search?: string,
  ): Promise<PaginatedResponse<Usuario>> {
    const searchTerm = (search || '').toLowerCase();
    return this.repository.findAndCountAll({
      where: {
        ...(searchTerm && {
          [Op.or]: [
            where(fn('LOWER', col('Usuario.nombre')), {
              [Op.like]: `%${searchTerm}%`,
            }),
          ],
        }),
      },
      include: [
        {
          model: Rol,
          where:
            user.rol.codigo === 'super'
              ? {}
              : {
                  codigo: {
                    [Op.not]: 'super',
                  },
                },
        },
        { model: Sede, through: { attributes: [] }, required: false },
      ],
      limit,
      offset,
      order: [['orden', 'ASC']],
    });
  }

  async findAllFilter(): Promise<Usuario[]> {
    return this.repository.findAll({
      order: [['orden', 'ASC']],
      include: [
        {
          model: Rol,
          where: {
            codigo: {
              [Op.not]: 'super',
            },
          },
        },
        {
          model: Sede,
          through: { attributes: [] },
          include: [{ model: Sede, required: false }],
          required: false,
        },
      ],
    });
  }

  async findOne(id: string): Promise<Usuario | null> {
    return this.repository.findOne({
      where: { id },
      include: [
        {
          model: Rol,
        },
        {
          model: Sede,
          through: { attributes: [] },
          required: false,
        },
      ],
    });
  }

  async create(
    dto: Partial<Usuario>,
    archivo?: Buffer<ArrayBufferLike>,
    descriptor?: number[],
  ): Promise<Usuario | null> {
    try {
      dto.archivo = archivo;
      dto.descriptor = descriptor;
      const orden = await this.repository.getNextOrderValue();
      dto.username = dto.username?.toLowerCase();
      dto.password = bcrypt.hashSync(dto.password as string, 10);
      return this.repository.create({ ...dto, orden });
    } catch (error) {
      throw new InternalServerErrorException('Error interno del servidor');
    }
  }

  async update(
    id: string,
    dto: Partial<Usuario>,
    archivo?: Buffer<ArrayBuffer>,
    descriptor?: number[],
  ): Promise<[number, Usuario[]]> {
    try {
      const result = await this.repository.findOne({ where: { id } });
      if (!result) {
        throw new NotFoundException('Usuario no encontrado');
      }
      const exist = result.toJSON();
      if (dto.password) {
        dto.password = bcrypt.hashSync(dto.password as string, 10);
      } else {
        dto.password = exist?.password; // Mantener la contraseña existente si no se proporciona una nueva
      }

      dto.archivo = archivo;
      dto.descriptor = descriptor;

      return this.repository.update(id, dto);
    } catch (error) {
      throw new InternalServerErrorException('Error interno del servidor');
    }
  }

  async changeStatus(
    id: string,
    isActive: boolean,
  ): Promise<[number, Usuario[]]> {
    return this.repository.update(id, { isActive });
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }

  async restore(id: string): Promise<void> {
    await this.repository.restore(id);
  }

  async validateUsuario(
    username: string,
    password: string,
  ): Promise<Usuario | null> {
    const data = await this.repository.findOne({
      scopes: ['withPassword'],
      where: { username },
      include: [
        {
          model: Rol,
        },
      ],
    });
    if (!data) {
      throw new BadRequestException(
        `No se encontró el un usuario vinculado al nombre '${username}'`,
      );
    }
    const user = data.toJSON();
    if (!user?.isActive) {
      throw new BadRequestException('Usuario inactivo');
    }
    if (!user?.password) {
      throw new BadRequestException('Usuario sin contraseña');
    }
    const isValidPassword = await bcrypt.compare(password, user?.password);
    if (isValidPassword) {
      const { password, ...result } = user;
      return result as Usuario;
    }
    return null;
  }

  async obtenerArchivo(id: string) {
    const result = await this.repository.findOne({
      scopes: ['withArchivo'],
      where: { id },
    });
    if (!result) {
      throw new BadRequestException('No se encontró el registro');
    }
    const data = result.toJSON();
    return {
      id: data.id,
      fileName: data.archivoNombre,
      file: data.archivo,
    };
  }

  async findByDNI(identificacion: string): Promise<any | null> {
    const result = await this.repository.findOne({
      where: { identificacion, isActive: true },
      include: [
        {
          model: Rol,
          where: { isActive: true },
        },
      ],
    });
    if (!result) {
      throw new BadRequestException('No se encontró el usuario');
    }
    const data = result.toJSON();
    return {
      identificacion: identificacion,
      nombres: `${data?.nombre} ${data?.apellido}`,
      cargo: data?.rol?.nombre,
      tieneRegistro: !!data?.archivoNombre,
      esTrabajador: false,
    };
  }

  findByIdUsuarioAndFecha(date: Date, id: string): Promise<Usuario> {
    const fecha = new Date(date);
    return this.repository.findOne({
      where: { id },
      order: [['orden', 'ASC']],
      include: [
        {
          model: Sede,
          through: { attributes: [] },
          include: [
            {
              model: Trabajador,
              through: { attributes: [] },
              where: { isActive: true },
              include: [
                {
                  model: ContactoTrabajador,
                  where: { isActive: true },
                },
                {
                  model: InfoTrabajador,
                  where: { isActive: true },
                },
                {
                  model: ContratoTrabajador,
                  where: {
                    isActive: true,
                    fechaInicio: {
                      [Op.lte]: fecha.toISOString().split('T')[0],
                    },
                  },
                  include: [
                    {
                      model: Cargo,
                    },
                  ],
                  required: true,
                },
                {
                  model: HorarioTrabajador,
                  include: [
                    {
                      model: TurnoTrabajo,
                    },
                    {
                      model: HorarioTrabajadorItem,
                      include: [
                        {
                          model: BloqueHoras,
                        },
                        {
                          model: JustificacionInasistencia,
                          where: { isActive: true },
                          required: false,
                        },
                      ],
                    },
                  ],
                  required: true,
                },
                {
                  model: Asistencia,
                  where: {
                    fecha: {
                      [Op.eq]: fecha.toISOString().split('T')[0],
                    },
                  },
                  include: [
                    {
                      model: CorreccionMarcacion,
                      required: false,
                    },
                  ],
                  required: false,
                },
                {
                  model: Vacacion,
                  where: {
                    [Op.and]: [
                      {
                        fechaInicio: {
                          [Op.lte]: fecha.toISOString().split('T')[0],
                        },
                      },
                      {
                        fechaFin: {
                          [Op.gte]: fecha.toISOString().split('T')[0],
                        },
                      },
                    ],
                  },
                  required: false,
                },
                {
                  model: PermisoTrabajador,
                  where: {
                    [Op.and]: [
                      {
                        fechaInicio: {
                          [Op.lte]: fecha.toISOString().split('T')[0],
                        },
                      },
                      {
                        fechaFin: {
                          [Op.gte]: fecha.toISOString().split('T')[0],
                        },
                      },
                    ],
                  },
                  required: false,
                },
              ],
            },
          ],
        },
      ],
    });
  }
}

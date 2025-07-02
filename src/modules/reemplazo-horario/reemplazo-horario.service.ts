import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { ReemplazoHorario } from './reemplazo-horario.model';
import { Trabajador } from '@modules/trabajador/trabajador.model';
import { ReemplazoHorarioDTO } from './reemplazo-horario.dto';
import { ContratoTrabajador } from '@modules/contrato-trabajador/contrato-trabajador.model';
import { Cargo } from '@modules/cargo/cargo.model';
import { Reemplacero } from '@modules/reemplacero/reemplacero.model';
import { ReemplazoHorarioRepository } from './reemplazo-horario.repository';
import { Usuario } from '@modules/usuario/usuario.model';
import { PaginatedResponse } from '@common/interfaces/paginated-response.interface';

@Injectable()
export class ReemplazoHorarioService {
  constructor(private readonly repository: ReemplazoHorarioRepository) {}

  async findAll(
    user: Usuario,
    limit: number,
    offset: number,
    filter?: boolean,
    search?: string,
  ): Promise<PaginatedResponse<ReemplazoHorario>> {
    const searchTerm = (search || '').toLowerCase();
    return this.repository.findAndCountAll({
      include: [
        {
          model: Trabajador,
          as: 'trabajador',
          required: true,
          include: [
            {
              model: ContratoTrabajador,
              include: [
                {
                  model: Cargo,
                },
              ],
            },
          ],
        },
        {
          model: Reemplacero,
          as: 'reemplacero',
          required: true,
        },
      ],
      limit,
      offset,
      order: [['orden', 'DESC']],
    });
  }

  async findOne(id: string): Promise<ReemplazoHorario | null> {
    return this.repository.findOne({
      where: { id },
    });
  }

  async create(dto: ReemplazoHorarioDTO): Promise<ReemplazoHorario | null> {
    try {
      const orden = await this.repository.getNextOrderValue();
      return this.repository.create({ ...dto, orden });
    } catch (error) {
      if (error.name === 'SequelizeUniqueConstraintError') {
        throw new BadRequestException('Ya existe un registro con ese valor');
      }
      throw new InternalServerErrorException('Error interno');
    }
  }

  async update(
    id: string,
    dto: ReemplazoHorarioDTO,
  ): Promise<[number, ReemplazoHorario[]]> {
    try {
      return this.repository.update(id, dto);
    } catch (error) {
      if (error.name === 'SequelizeUniqueConstraintError') {
        throw new BadRequestException('Ya existe un registro con ese valor');
      }
      throw new InternalServerErrorException('Error interno');
    }
  }

  async changeStatus(
    id: string,
    isActive: boolean,
  ): Promise<[number, ReemplazoHorario[]]> {
    return this.repository.update(id, { isActive });
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }

  async restore(id: string): Promise<void> {
    await this.repository.restore(id);
  }
}

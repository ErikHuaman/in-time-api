import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { PatronHorario } from './patron-horario.model';
import { PatronHorarioDTO } from './patron-horario.dto';
import { PatronHorarioItem } from '@modules/patron-horario-item/patron-horario-item.model';
import { BloqueHoras } from '@modules/bloque-horas/bloque-horas.model';
import { Usuario } from '@modules/usuario/usuario.model';
import { PatronHorarioRepository } from './patron-horario.repository';
import { PaginatedResponse } from '@common/interfaces/paginated-response.interface';

@Injectable()
export class PatronHorarioService {
  constructor(private readonly repository: PatronHorarioRepository) {}

  async findAll(
    user: Usuario,
    limit: number,
    offset: number,
    filter?: boolean,
    search?: string,
  ): Promise<PaginatedResponse<PatronHorario>> {
    const searchTerm = (search || '').toLowerCase();
    return this.repository.findAndCountAll({
      include: [
        {
          model: PatronHorarioItem,
          include: [
            {
              model: BloqueHoras,
              where: { isActive: true },
              required: false,
            },
          ],
          required: true,
        },
      ],
      order: [['orden', 'DESC']],
    });
  }

  async findOne(id: string): Promise<PatronHorario | null> {
    return this.repository.findOne({
      where: { id },
    });
  }

  async create(dto: PatronHorarioDTO): Promise<PatronHorario | null> {
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
    dto: PatronHorarioDTO,
  ): Promise<[number, PatronHorario[]]> {
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
  ): Promise<[number, PatronHorario[]]> {
    return this.repository.update(id, { isActive });
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }

  async restore(id: string): Promise<void> {
    await this.repository.restore(id);
  }
}

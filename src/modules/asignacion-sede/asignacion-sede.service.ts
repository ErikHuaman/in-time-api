import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { AsignacionSede } from './asignacion-sede.model';
import { Sede } from '@modules/sede/sede.model';
import { AsignacionSedeRepository } from './asignacion-sede.repository';
import { PaginatedResponse } from '@common/interfaces/paginated-response.interface';

@Injectable()
export class AsignacionSedeService {
  constructor(private readonly repository: AsignacionSedeRepository) {}

  async findAll(): Promise<PaginatedResponse<AsignacionSede>> {
    return this.repository.findAndCountAll();
  }

  async findOne(id: string): Promise<AsignacionSede | null> {
    return this.repository.findOne({
      where: { id },
    });
  }

  async findAllByTrabajador(idTrabajador: string): Promise<AsignacionSede[]> {
    return this.repository.findAll({
      where: { idTrabajador },
      order: [['orden', 'DESC']],
      include: [
        {
          model: Sede,
        },
      ],
    });
  }

  async create(dto: Partial<AsignacionSede>): Promise<AsignacionSede | null> {
    try {
      return this.repository.create({ ...dto });
    } catch (error) {
      if (error.name === 'SequelizeUniqueConstraintError') {
        throw new BadRequestException('Ya existe un registro con ese valor');
      }
      throw new InternalServerErrorException('Error interno');
    }
  }

  async createMany(
    dtoList: Partial<AsignacionSede>[],
  ): Promise<AsignacionSede[]> {
    const orden = await this.repository.getNextOrderValue();
    return this.repository.bulkCreate(
      dtoList.map((item, i) => ({ ...item, orden: orden + i })),
      {
        updateOnDuplicate: ['idSede', 'fechaAsignacion'],
        individualHooks: true,
        ignoreDuplicates: true,
      },
    );
  }

  async update(
    id: string,
    dto: Partial<AsignacionSede>,
  ): Promise<[number, AsignacionSede[]]> {
    try {
      return this.repository.update(id, dto);
    } catch (error) {
      if (error.name === 'SequelizeUniqueConstraintError') {
        throw new BadRequestException('Ya existe un registro con ese valor');
      }
      throw new InternalServerErrorException('Error interno');
    }
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }

  async restore(id: string): Promise<void> {
    await this.repository.restore(id);
  }
}

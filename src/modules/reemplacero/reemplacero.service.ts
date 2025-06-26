import { BadRequestException, Injectable } from '@nestjs/common';
import { Reemplacero } from './reemplacero.model';
import { Usuario } from '@modules/usuario/usuario.model';
import { PaginatedResponse } from '@common/interfaces/paginated-response.interface';
import { ReemplaceroRepository } from './reemplacero.repository';

@Injectable()
export class ReemplaceroService {
  constructor(private readonly repository: ReemplaceroRepository) {}

  async findAll(
    user: Usuario,
    limit: number,
    offset: number,
    filter?: boolean,
    search?: string,
  ): Promise<PaginatedResponse<Reemplacero>> {
    const searchTerm = (search || '').toLowerCase();
    return this.repository.findAndCountAll({
      limit,
      offset,
    });
  }

  async findOne(id: string): Promise<Reemplacero | null> {
    return this.repository.findOne({
      where: { id },
    });
  }

  async create(
    dto: Partial<Reemplacero>,
    archivo?: Buffer<ArrayBufferLike>,
    descriptor?: number[],
  ): Promise<Reemplacero | null> {
    dto.archivo = archivo;

    dto.descriptor = descriptor;
    const orden = await this.repository.getNextOrderValue();
    return this.repository.create({ ...dto, orden });
  }

  async update(
    id: string,
    dto: Partial<Reemplacero>,
    archivo?: Buffer<ArrayBuffer>,
    descriptor?: number[],
  ): Promise<[number, Reemplacero[]]> {
    dto.archivo = archivo;
    dto.descriptor = descriptor;
    return this.repository.update(id, dto);
  }

  async changeStatus(
    id: string,
    isActive: boolean,
  ): Promise<[number, Reemplacero[]]> {
    return this.repository.update(id, { isActive });
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }

  async restore(id: string): Promise<void> {
    await this.repository.restore(id);
  }

  async obtenerArchivo(id: string) {
    const result = await this.repository.findOne({
      where: { id },
    });
    if (!result) {
      throw new BadRequestException('No se encontró el registro');
    }
    return {
      id: result.get().id,
      fileName: result.get().archivoNombre,
      file: result.get().archivo,
    };
  }
}

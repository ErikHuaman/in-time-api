import { BadRequestException, Injectable } from '@nestjs/common';
import { RegistroBiometrico } from './registro-biometrico.model';
import { RegistroBiometricoRepository } from './registro-biometrico.repository';

@Injectable()
export class RegistroBiometricoService {
  constructor(private readonly repository: RegistroBiometricoRepository) {}

  async findAll(): Promise<RegistroBiometrico[]> {
    return this.repository.findAll();
  }

  async findOne(id: string): Promise<RegistroBiometrico | null> {
    return this.repository.findOne({
      where: { id },
    });
  }

  async create(
    dto: Partial<RegistroBiometrico>,
    archivo?: Buffer<ArrayBufferLike>,
    descriptor?: number[],
  ): Promise<RegistroBiometrico | null> {
    dto.archivo = archivo;
    dto.descriptor = descriptor;

    const orden = await this.repository.getNextOrderValue();
    return this.repository.create({ ...dto, orden });
  }

  async update(
    id: string,
    dto: Partial<RegistroBiometrico>,
    archivo?: Buffer<ArrayBuffer>,
    descriptor?: number[],
  ): Promise<[number, RegistroBiometrico[]]> {
    dto.archivo = archivo;
    dto.descriptor = descriptor;
    return this.repository.update(id, dto);
  }

  async changeStatus(
    id: string,
    isActive: boolean,
  ): Promise<[number, RegistroBiometrico[]]> {
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

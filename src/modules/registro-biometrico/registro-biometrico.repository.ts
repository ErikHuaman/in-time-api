import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { GenericCrudRepository } from '@common/repositories/generic-crud.repository';
import { RegistroBiometrico } from './registro-biometrico.model';

@Injectable()
export class RegistroBiometricoRepository extends GenericCrudRepository<RegistroBiometrico> {
  constructor(
    @InjectModel(RegistroBiometrico)
    model: typeof RegistroBiometrico,
  ) {
    super(model);
  }
}

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { GenericCrudRepository } from '@common/repositories/generic-crud.repository';
import { TipoDocIdent } from './tipo-doc-ident.model';

@Injectable()
export class TipoDocIdentRepository extends GenericCrudRepository<TipoDocIdent> {
  constructor(
    @InjectModel(TipoDocIdent)
    model: typeof TipoDocIdent,
  ) {
    super(model);
  }
}

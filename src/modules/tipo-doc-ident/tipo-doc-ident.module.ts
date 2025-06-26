import { Module } from '@nestjs/common';
import { TipoDocIdentController } from './tipo-doc-ident.controller';
import { TipoDocIdentService } from './tipo-doc-ident.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { TipoDocIdent } from './tipo-doc-ident.model';
import { TipoDocIdentRepository } from './tipo-doc-ident.repository';

@Module({
  imports: [SequelizeModule.forFeature([TipoDocIdent])],
  controllers: [TipoDocIdentController],
  providers: [TipoDocIdentService, TipoDocIdentRepository],
  exports: [TipoDocIdentService, TipoDocIdentRepository],
})
export class TipoDocIdentModule {}

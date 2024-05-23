import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {LivroAutorPivo, LivroAutorPivoRelations} from '../models';

export class LivroAutorPivoRepository extends DefaultCrudRepository<
  LivroAutorPivo,
  typeof LivroAutorPivo.prototype.id,
  LivroAutorPivoRelations
> {
  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
  ) {
    super(LivroAutorPivo, dataSource);
  }
}

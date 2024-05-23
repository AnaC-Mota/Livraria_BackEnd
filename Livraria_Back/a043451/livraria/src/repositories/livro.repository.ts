import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {Livro, LivroRelations, Editora} from '../models';
import {EditoraRepository} from './editora.repository';

export class LivroRepository extends DefaultCrudRepository<
  Livro,
  typeof Livro.prototype.id,
  LivroRelations
> {

  public readonly editora: BelongsToAccessor<Editora, typeof Livro.prototype.id>;

  constructor(
    @inject('datasources.db') dataSource: DbDataSource, @repository.getter('EditoraRepository') protected editoraRepositoryGetter: Getter<EditoraRepository>,
  ) {
    super(Livro, dataSource);
    this.editora = this.createBelongsToAccessorFor('editora', editoraRepositoryGetter,);
    this.registerInclusionResolver('editora', this.editora.inclusionResolver);
  }
}

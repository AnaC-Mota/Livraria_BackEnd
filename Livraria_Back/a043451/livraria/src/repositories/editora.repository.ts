import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {Editora, EditoraRelations, Livro} from '../models';
import {LivroRepository} from './livro.repository';

export class EditoraRepository extends DefaultCrudRepository<
  Editora,
  typeof Editora.prototype.id,
  EditoraRelations
> {

  public readonly livros: HasManyRepositoryFactory<Livro, typeof Editora.prototype.id>;

  constructor(
    @inject('datasources.db') dataSource: DbDataSource, @repository.getter('LivroRepository') protected livroRepositoryGetter: Getter<LivroRepository>,
  ) {
    super(Editora, dataSource);
    this.livros = this.createHasManyRepositoryFactoryFor('livros', livroRepositoryGetter,);
    this.registerInclusionResolver('livros', this.livros.inclusionResolver);
  }
}

import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyThroughRepositoryFactory} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {Autor, AutorRelations, Livro, LivroAutorPivo} from '../models';
import {LivroAutorPivoRepository} from './livro-autor-pivo.repository';
import {LivroRepository} from './livro.repository';

export class AutorRepository extends DefaultCrudRepository<
  Autor,
  typeof Autor.prototype.id,
  AutorRelations
> {

  public readonly livros: HasManyThroughRepositoryFactory<Livro, typeof Livro.prototype.id,
          LivroAutorPivo,
          typeof Autor.prototype.id
        >;

  constructor(
    @inject('datasources.db') dataSource: DbDataSource, @repository.getter('LivroAutorPivoRepository') protected livroAutorPivoRepositoryGetter: Getter<LivroAutorPivoRepository>, @repository.getter('LivroRepository') protected livroRepositoryGetter: Getter<LivroRepository>,
  ) {
    super(Autor, dataSource);
    this.livros = this.createHasManyThroughRepositoryFactoryFor('livros', livroRepositoryGetter, livroAutorPivoRepositoryGetter,);
    this.registerInclusionResolver('livros', this.livros.inclusionResolver);
  }
}

import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
  import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
Autor,
LivroAutorPivo,
Livro,
} from '../models';
import {AutorRepository} from '../repositories';

export class AutorLivroController {
  constructor(
    @repository(AutorRepository) protected autorRepository: AutorRepository,
  ) { }

  @get('/autors/{id}/livros', {
    responses: {
      '200': {
        description: 'Array of Autor has many Livro through LivroAutorPivo',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Livro)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Livro>,
  ): Promise<Livro[]> {
    return this.autorRepository.livros(id).find(filter);
  }

  @post('/autors/{id}/livros', {
    responses: {
      '200': {
        description: 'create a Livro model instance',
        content: {'application/json': {schema: getModelSchemaRef(Livro)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Autor.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Livro, {
            title: 'NewLivroInAutor',
            exclude: ['id'],
          }),
        },
      },
    }) livro: Omit<Livro, 'id'>,
  ): Promise<Livro> {
    return this.autorRepository.livros(id).create(livro);
  }

  @patch('/autors/{id}/livros', {
    responses: {
      '200': {
        description: 'Autor.Livro PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Livro, {partial: true}),
        },
      },
    })
    livro: Partial<Livro>,
    @param.query.object('where', getWhereSchemaFor(Livro)) where?: Where<Livro>,
  ): Promise<Count> {
    return this.autorRepository.livros(id).patch(livro, where);
  }

  @del('/autors/{id}/livros', {
    responses: {
      '200': {
        description: 'Autor.Livro DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Livro)) where?: Where<Livro>,
  ): Promise<Count> {
    return this.autorRepository.livros(id).delete(where);
  }
}

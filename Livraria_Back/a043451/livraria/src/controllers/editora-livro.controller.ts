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
  Editora,
  Livro,
} from '../models';
import {EditoraRepository} from '../repositories';

export class EditoraLivroController {
  constructor(
    @repository(EditoraRepository) protected editoraRepository: EditoraRepository,
  ) { }

  @get('/editoras/{id}/livros', {
    responses: {
      '200': {
        description: 'Array of Editora has many Livro',
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
    return this.editoraRepository.livros(id).find(filter);
  }

  @post('/editoras/{id}/livros', {
    responses: {
      '200': {
        description: 'Editora model instance',
        content: {'application/json': {schema: getModelSchemaRef(Livro)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Editora.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Livro, {
            title: 'NewLivroInEditora',
            exclude: ['id'],
            optional: ['editoraId']
          }),
        },
      },
    }) livro: Omit<Livro, 'id'>,
  ): Promise<Livro> {
    return this.editoraRepository.livros(id).create(livro);
  }

  @patch('/editoras/{id}/livros', {
    responses: {
      '200': {
        description: 'Editora.Livro PATCH success count',
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
    return this.editoraRepository.livros(id).patch(livro, where);
  }

  @del('/editoras/{id}/livros', {
    responses: {
      '200': {
        description: 'Editora.Livro DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Livro)) where?: Where<Livro>,
  ): Promise<Count> {
    return this.editoraRepository.livros(id).delete(where);
  }
}

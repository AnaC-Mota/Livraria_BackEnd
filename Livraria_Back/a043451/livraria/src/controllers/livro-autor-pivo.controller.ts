import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  param,
  patch,
  post,
  put,
  requestBody,
  response,
} from '@loopback/rest';
import {LivroAutorPivo} from '../models';
import {LivroAutorPivoRepository} from '../repositories';

export class LivroAutorPivoController {
  constructor(
    @repository(LivroAutorPivoRepository)
    public livroAutorPivoRepository: LivroAutorPivoRepository,
  ) { }

  @post('/livro-autor-pivos')
  @response(200, {
    description: 'LivroAutorPivo model instance',
    content: {'application/json': {schema: getModelSchemaRef(LivroAutorPivo)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(LivroAutorPivo, {
            title: 'NewLivroAutorPivo',
            exclude: ['id'],
          }),
        },
      },
    })
    livroAutorPivo: Omit<LivroAutorPivo, 'id'>,
  ): Promise<LivroAutorPivo> {
    return this.livroAutorPivoRepository.create(livroAutorPivo);
  }

  @get('/livro-autor-pivos/count')
  @response(200, {
    description: 'LivroAutorPivo model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(LivroAutorPivo) where?: Where<LivroAutorPivo>,
  ): Promise<Count> {
    return this.livroAutorPivoRepository.count(where);
  }

  @get('/livro-autor-pivos')
  @response(200, {
    description: 'Array of LivroAutorPivo model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(LivroAutorPivo, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(LivroAutorPivo) filter?: Filter<LivroAutorPivo>,
  ): Promise<LivroAutorPivo[]> {
    return (await this.livroAutorPivoRepository.find(filter));
  }

  @patch('/livro-autor-pivos')
  @response(200, {
    description: 'LivroAutorPivo PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(LivroAutorPivo, {partial: true}),
        },
      },
    })
    livroAutorPivo: LivroAutorPivo,
    @param.where(LivroAutorPivo) where?: Where<LivroAutorPivo>,
  ): Promise<Count> {
    return this.livroAutorPivoRepository.updateAll(livroAutorPivo, where);
  }

  @get('/livro-autor-pivos/{id}')
  @response(200, {
    description: 'LivroAutorPivo model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(LivroAutorPivo, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(LivroAutorPivo, {exclude: 'where'}) filter?: FilterExcludingWhere<LivroAutorPivo>
  ): Promise<LivroAutorPivo> {
    return this.livroAutorPivoRepository.findById(id, filter);
  }

  @patch('/livro-autor-pivos/{id}')
  @response(204, {
    description: 'LivroAutorPivo PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(LivroAutorPivo, {partial: true}),
        },
      },
    })
    livroAutorPivo: LivroAutorPivo,
  ): Promise<void> {
    await this.livroAutorPivoRepository.updateById(id, livroAutorPivo);
  }

  @put('/livro-autor-pivos/{id}')
  @response(204, {
    description: 'LivroAutorPivo PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() livroAutorPivo: LivroAutorPivo,
  ): Promise<void> {
    await this.livroAutorPivoRepository.replaceById(id, livroAutorPivo);
  }

  @del('/livro-autor-pivos/{id}')
  @response(204, {
    description: 'LivroAutorPivo DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.livroAutorPivoRepository.deleteById(id);
  }
}

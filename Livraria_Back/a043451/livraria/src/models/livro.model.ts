import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Editora} from './editora.model';

@model()
export class Livro extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: false,
    required: true,
  })
  id: number;

  @property({
    type: 'string',
    required: true,
  })
  titulo: string;

  @property({
    type: 'string',
  })
  anoPublicacao?: string;

  @property({
    type: 'string',
  })
  quantPaginas?: string;

  @belongsTo(() => Editora)
  editoraId: number;

  constructor(data?: Partial<Livro>) {
    super(data);
  }
}

export interface LivroRelations {
  // describe navigational properties here
}

export type LivroWithRelations = Livro & LivroRelations;

import {Entity, hasMany, model, property} from '@loopback/repository';
import {LivroAutorPivo} from './livro-autor-pivo.model';
import {Livro} from './livro.model';

@model()
export class Autor extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'string',
    required: true,
  })
  nome: string;

  @hasMany(() => Livro, {through: {model: () => LivroAutorPivo}})
  livros: Livro[];

  constructor(data?: Partial<Autor>) {
    super(data);
  }
}

export interface AutorRelations {
  // describe navigational properties here
}

export type AutorWithRelations = Autor & AutorRelations;

import {Entity, model, property, hasMany} from '@loopback/repository';
import {Livro} from './livro.model';

@model()
export class Editora extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'string',
  })
  nome?: string;

  @hasMany(() => Livro)
  livros: Livro[];

  constructor(data?: Partial<Editora>) {
    super(data);
  }
}

export interface EditoraRelations {
  // describe navigational properties here
}

export type EditoraWithRelations = Editora & EditoraRelations;

import {Entity, model, property} from '@loopback/repository';

@model()
export class LivroAutorPivo extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'number',
  })
  autorId?: number;

  @property({
    type: 'number',
  })
  livroId?: number;

  constructor(data?: Partial<LivroAutorPivo>) {
    super(data);
  }
}

export interface LivroAutorPivoRelations {
  // describe navigational properties here
}

export type LivroAutorPivoWithRelations = LivroAutorPivo & LivroAutorPivoRelations;

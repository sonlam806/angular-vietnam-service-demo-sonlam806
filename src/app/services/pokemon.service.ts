import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { PaginatedPokemon, Pokemon } from '../models/pokemon';
import { BackendService } from './backend.service';

@Injectable({ providedIn: 'root' })
export class PokemonService {
  // private pokemons: PaginatedPokemon[];
  private pokemons: Pokemon[];

  constructor(private backendService: BackendService) {}

  fetchPokemons(limit: number = 20, offset: number = 0) {
    return this.backendService.getPokemons(limit, offset);
  }
}

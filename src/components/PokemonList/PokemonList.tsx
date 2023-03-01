/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import { Pokemon } from '../../types/Pokemon';
import { PokemonItem } from '../PokemonItem';

interface Props {
  pokemons: Pokemon[];
}

export const PokemonList: React.FC<Props> = ({
  pokemons,
}) => {
  return (
    <div className="pokemon-list">
      {pokemons.map(pokemon => (
        <PokemonItem
          key={pokemon.id}
          pokemon={pokemon}
        />
      ))}
    </div>
  );
};

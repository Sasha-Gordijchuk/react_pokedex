/* eslint-disable max-len */
import React from 'react';
import { Pokemon } from '../../types/Pokemon';

interface Props {
  pokemon: Pokemon;
  handlePokemonSelect: (selectedPokemon: Pokemon) => void;
}

export const PokemonItem: React.FC<Props> = ({
  pokemon,
  handlePokemonSelect,
}) => {
  const {
    name,
    sprites,
    types,
  } = pokemon;

  return (
    <div
      className="pokemon-item card"
      onClick={() => handlePokemonSelect(pokemon)}
      onKeyUp={() => handlePokemonSelect(pokemon)}
      role="button"
      tabIndex={0}
    >
      <img
        className="pokemon-item__image"
        src={sprites.front_default
          || 'https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg'}
        alt={name}
      />
      <div className="pokemon-item__details">
        <span className="pokemon-item__name">{name}</span>
        <div className="pokemon-item__types">
          {types.map(type => (
            <span
              key={type.type.name}
              className={`pokemon-item__type pokemon-item__type--${type.type.name}`}
            >
              {type.type.name}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

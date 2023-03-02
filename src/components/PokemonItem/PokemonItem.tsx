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
      className="pokemon card"
      onClick={() => handlePokemonSelect(pokemon)}
      onKeyDown={() => { }}
      role="button"
      tabIndex={0}
    >
      <img
        className="pokemon-item__image"
        src={sprites.front_default}
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

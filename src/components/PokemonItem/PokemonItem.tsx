/* eslint-disable no-console */
import React from 'react';
import { Pokemon } from '../../types/Pokemon';

interface Props {
  pokemon: Pokemon;
}

export const PokemonItem: React.FC<Props> = ({
  pokemon,
}) => {
  const {
    name,
    sprites,
    types,
  } = pokemon;

  return (
    <div className="pokemon">
      <img className="pokemon__image" src={sprites.front_default} alt={name} />
      <div className="pokemon__details">
        <span className="pokemon__name">{name}</span>
        <div className="pokemon__types">
          {types.map(type => (
            <span
              key={type.type.name}
              className={`pokemon__type pokemon__type--${type.type.name}`}
            >
              {type.type.name}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

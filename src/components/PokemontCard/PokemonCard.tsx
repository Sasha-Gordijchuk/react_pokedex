import React from 'react';
import { Pokemon } from '../../types/Pokemon';

interface Props {
  pokemon: Pokemon;
}

export const PokemonCard: React.FC<Props> = ({
  pokemon,
}) => {
  const {
    name,
    sprites,
    types,
    weight,
    moves,
  } = pokemon;

  const stats = pokemon.stats.map(stat => stat.base_stat);

  return (
    <div className="app__pokemon-card pokemon-card card">
      <img
        className="pokemon-card__image"
        src={sprites.front_default}
        alt={name}
      />
      <h2 className="pokemon-card__name">{name}</h2>
      <table className="pokemon-card__table table is-bordered is-fullwidth">
        <tbody>
          <tr>
            <th>Type</th>
            <th>
              {types.map(type => (
                <span
                  key={type.type.name}
                  className="pokemon-card__type"
                >
                  {type.type.name}
                </span>
              ))}
            </th>
          </tr>
          <tr>
            <th>Attack</th>
            <th>{stats[0]}</th>
          </tr>
          <tr>
            <th>Defense</th>
            <th>{stats[1]}</th>
          </tr>
          <tr>
            <th>HP</th>
            <th>{stats[2]}</th>
          </tr>
          <tr>
            <th>SP Attack</th>
            <th>{stats[3]}</th>
          </tr>
          <tr>
            <th>SP Defense</th>
            <th>{stats[4]}</th>
          </tr>
          <tr>
            <th>Speed</th>
            <th>{stats[5]}</th>
          </tr>
          <tr>
            <th>Weight</th>
            <th>{weight}</th>
          </tr>
          <tr>
            <th>Total moves</th>
            <th>{moves.length}</th>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

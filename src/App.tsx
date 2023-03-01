/* eslint-disable no-console */
import React, { useEffect, useState } from 'react';
import { getByUrl, getGroupByUrls } from './api/poke';
import { PokemonList } from './components/PokemonList';
import { Pokemon } from './types/Pokemon';
import { ResourceList } from './types/ResourceList';

export const App: React.FC = () => {
  const [pokemonsFromServer, setPokemonsFromServer] = useState<ResourceList>();
  const [detailedPokemons, setDetailedPokemons] = useState<Pokemon[]>([]);

  const fetchDetailedPokemons = async () => {
    if (pokemonsFromServer) {
      const urls = pokemonsFromServer.results.map(pokemon => pokemon.url);

      const result = await getGroupByUrls(urls);

      setDetailedPokemons(result);
    }
  };

  const fetchSimplePokemons = async () => {
    const res = await getByUrl();

    setPokemonsFromServer(res);
  };

  useEffect(() => {
    fetchSimplePokemons();
  }, []);

  useEffect(() => {
    fetchDetailedPokemons();
  }, [pokemonsFromServer]);

  const test = async () => {
    const res = await getByUrl('https://pokeapi.co/api/v2/type');

    console.log(res);
  };

  return (
    <div className="app">
      <header className="app__header">
        <h1>Pokedex</h1>
      </header>
      <main className="app__main">
        <PokemonList
          pokemons={detailedPokemons}
        />
      </main>
      <button type="button" onClick={() => test()}>test</button>
    </div>
  );
};

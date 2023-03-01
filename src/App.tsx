/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-console */
import React, { useEffect, useState } from 'react';
import { getByUrl, getGroupByUrls } from './api/poke';
import { Pokemon } from './types/Pokemon';
import { Resource } from './types/Resource';
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

  return (
    <div className="app">
      <header className="app__header">
        Pokedex
      </header>
    </div>
  );
};

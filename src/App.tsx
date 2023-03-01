/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-console */
import React, { useCallback, useEffect, useState } from 'react';
import { Pagination } from '@mui/material';
import { getByUrl, getPagesCount, getPokemonsByPage } from './api/poke';
import { PokemonList } from './components/PokemonList';
import { Pokemon } from './types/Pokemon';

export const App: React.FC = () => {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pagesCount, setPagesCount] = useState<number>(0);

  const fetchPokemons = async () => {
    const result = await getPokemonsByPage(currentPage);

    setPokemons(result);
  };

  const fetchPagesCount = async () => {
    const result = await getPagesCount();

    setPagesCount(result);
  };

  const handlePageChange = useCallback((pageNumber: number) => {
    setCurrentPage(pageNumber);
  }, []);

  useEffect(() => {
    fetchPagesCount();
    fetchPokemons();
  }, []);

  useEffect(() => {
    fetchPokemons();
  }, [currentPage]);

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
          pokemons={pokemons}
        />

        <Pagination
          variant="outlined"
          count={pagesCount}
          onChange={(event, page) => handlePageChange(page)}
        />
      </main>
      <button type="button" onClick={() => test()}>test</button>
    </div>
  );
};

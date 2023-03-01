/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-console */
import React, { useCallback, useEffect, useState } from 'react';
import { Pagination } from '@mui/material';
import { getPagesCount, getPokemonsByPage } from './api/poke';
import { PokemonList } from './components/PokemonList';
import { Pokemon } from './types/Pokemon';
import { PokemonCard } from './components/PokemontCard';

export const App: React.FC = () => {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pagesCount, setPagesCount] = useState<number>(0);
  const [selectedPokemon, setSelectedPokemon] = useState<Pokemon | null>(null);

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

  const handlePokemonSelect = useCallback((pokemon: Pokemon) => {
    setSelectedPokemon(pokemon);
  }, []);

  useEffect(() => {
    fetchPagesCount();
    fetchPokemons();
  }, []);

  useEffect(() => {
    fetchPokemons();
  }, [currentPage]);

  return (
    <div className="app">
      <header className="app__header">
        <h1>Pokedex</h1>
      </header>
      <main className="app__main">
        <PokemonList
          pokemons={pokemons}
          handlePokemonSelect={handlePokemonSelect}
        />

        <div className="app__card-wrapper">
          {selectedPokemon
            ? (
              <PokemonCard
                pokemon={selectedPokemon}
              />
            ) : (
              <span>Select a Pokemon to see details</span>
            )}
        </div>

      </main>
      <footer>
        <Pagination
          variant="outlined"
          count={pagesCount}
          onChange={(event, page) => handlePageChange(page)}
        />
      </footer>
    </div>
  );
};

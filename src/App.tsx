/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useCallback, useEffect, useState } from 'react';
import { Pagination } from '@mui/material';
import { getPagesCount, getPokemonsByPage } from './api/poke';
import { PokemonList } from './components/PokemonList';
import { Pokemon } from './types/Pokemon';
import { PokemonCard } from './components/PokemontCard';
import { Filter } from './components/Filter';
import { Loader } from './components/Loader';

export const App: React.FC = () => {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pagesCount, setPagesCount] = useState<number>(0);
  const [selectedPokemon, setSelectedPokemon] = useState<Pokemon | null>(null);
  const [isFiltred, setIsFiltred] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fetchPokemons = async () => {
    setIsLoading(true);

    const result = await getPokemonsByPage(currentPage);

    setPokemons(result);
    setIsLoading(false);
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

  const showFiltredPokemons = useCallback((
    isPokemonFiltred: boolean,
    pages?: number,
    page?: number,
    detailedPokemons?: Pokemon[],
  ) => {
    if (isPokemonFiltred && pages && page && detailedPokemons) {
      setPagesCount(pages);
      setCurrentPage(page);
      setPokemons(detailedPokemons);
    } else {
      fetchPagesCount();
      setCurrentPage(1);
      fetchPokemons();
    }

    setIsFiltred(isPokemonFiltred);
  }, []);

  useEffect(() => {
    fetchPagesCount();
  }, []);

  useEffect(() => {
    if (!isFiltred) {
      fetchPokemons();
    }
  }, [currentPage]);

  return (
    <div className="app">
      <header className="app__header">
        <h1>Pokedex</h1>
      </header>

      <Filter
        currentPage={currentPage}
        showFiltredPokemons={showFiltredPokemons}
      />

      <main className="app__main">
        {isLoading
          ? (<Loader />
          ) : (
            <>
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
                    <span className="app__plug">
                      Select a Pokemon to see details
                    </span>
                  )}
              </div>
            </>
          )}
      </main>

      <footer className="app__footer">
        <Pagination
          variant="outlined"
          count={pagesCount}
          page={currentPage}
          onChange={(event, page) => handlePageChange(page)}
        />
      </footer>
    </div>
  );
};

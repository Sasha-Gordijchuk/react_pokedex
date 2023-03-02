import React, { useEffect, useState } from 'react';
import {
  getDetailedPokemons,
  getFilterTypes,
  getFiltredPokemons,
} from '../../api/poke';
import { Pokemon } from '../../types/Pokemon';
import { Resource } from '../../types/Resource';

interface Props {
  currentPage: number;
  showFiltredPokemons: (
    isFiltred: boolean,
    pagesCount?: number,
    currentPage?: number,
    detailedPokemons?: Pokemon[],
  ) => void;
}

export const Filter: React.FC<Props> = ({
  currentPage,
  showFiltredPokemons,
}) => {
  const [filterTypes, setFilterTypes] = useState<string[]>([]);
  const [filterType, setFilterType] = useState<string>('');
  const [filtredPokemons, setFiltredPokemons] = useState<Resource[]>([]);
  const [pagesCount, setPagesCount] = useState<number>(0);

  const fetchFilterTypes = async () => {
    const result = await getFilterTypes();

    setFilterTypes(result);
  };

  const getPagesCount = (array: Resource[]) => {
    return Math.ceil(array.length / 12);
  };

  const fetchFiltredPokemons = async () => {
    const result = await getFiltredPokemons(filterType);

    return result;
  };

  const fetchDetailedPokemons = async (
    page: number,
    generalPokemons: Resource[],
  ) => {
    const start = (page * 12) - 12;
    const end = page * 12;

    const result = await getDetailedPokemons(
      generalPokemons.slice(start, end),
    );

    return result;
  };

  const handleChangeFilter = async () => {
    if (filterType === '') {
      showFiltredPokemons(false);

      return;
    }

    const generalPokemons = await fetchFiltredPokemons();
    const pages = getPagesCount(generalPokemons);
    const detailedPokemons = await fetchDetailedPokemons(1, generalPokemons);

    setFiltredPokemons(generalPokemons);
    setPagesCount(pages);
    showFiltredPokemons(true, pages, 1, detailedPokemons);
  };

  const changePage = async () => {
    const detailedPokemons = await fetchDetailedPokemons(
      currentPage,
      filtredPokemons,
    );

    showFiltredPokemons(true, pagesCount, currentPage, detailedPokemons);
  };

  useEffect(() => {
    fetchFilterTypes();
  }, []);

  useEffect(() => {
    if (filterType !== '') {
      changePage();
    }
  }, [currentPage]);

  return (
    <div className="filter">
      <div className="select">
        <select
          onChange={(event) => setFilterType(event.target.value)}
        >
          <option value="">All</option>
          {filterTypes.map((type: string) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>

      </div>

      <button
        type="button"
        className="button"
        onClick={() => handleChangeFilter()}
      >
        Filter
      </button>
    </div>
  );
};

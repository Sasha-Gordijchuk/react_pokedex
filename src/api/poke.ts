import axios from 'axios';
import { Resource } from '../types/Resource';

const BASE_URL = 'https://pokeapi.co/api/v2';

export const getPagesCount = async () => {
  const result = await axios.get(`${BASE_URL}/pokemon`);

  return Math.ceil(result.data.count / 12);
};

export const getFilterTypes = async () => {
  const result = await axios.get(`${BASE_URL}/type?limit=999`);

  return result.data.results.map((el: Resource) => el.name);
};

export const getDetailedPokemons = async (resources: Resource[]) => {
  const result = await Promise.all(resources
    .map((el: Resource) => axios.get(el.url)));

  return result.map(obj => obj.data);
};

export const getPokemonsByPage = async (page: number) => {
  const offset = (page * 12) - 12;
  const general = await axios.get(`${BASE_URL}/pokemon/?limit=12&offset=${offset}`);

  const urls = general.data.results;
  const result = await getDetailedPokemons(urls);

  return result;
};

export const getFiltredPokemons = async (type: string) => {
  const general = await axios.get(`${BASE_URL}/type/${type}`);
  const result = general.data.pokemon
    .map((poke: { pokemon: Resource, slot: number }) => poke.pokemon);

  return result;
};

/* eslint-disable no-console */
import axios from 'axios';
import { Resource } from '../types/Resource';

export const getByUrl = async (
  url: string | null = 'https://pokeapi.co/api/v2/pokemon/?limit=12',
) => {
  if (url) {
    const result = await axios.get(url);

    return result.data;
  }

  return null;
};

export const getPokemonsByPage = async (page: number) => {
  const offset = (page * 12) - 12;
  const general = await axios.get(`https://pokeapi.co/api/v2/pokemon/?limit=12&offset=${offset}`);
  const urls = general.data.results.map((el: Resource) => el.url);
  const result = await Promise.all(urls.map((url: string) => axios.get(url)));

  return result.map(obj => obj.data);
};

export const getPagesCount = async () => {
  const result = await axios.get('https://pokeapi.co/api/v2/pokemon');

  return Math.ceil(result.data.count / 12);
};

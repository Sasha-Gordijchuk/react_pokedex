/* eslint-disable no-console */
import axios from 'axios';

export const getByUrl = async (
  url: string | null = 'https://pokeapi.co/api/v2/pokemon/?limit=12',
) => {
  if (url) {
    const result = await axios.get(url);

    return result.data;
  }

  return null;
};

export const getGroupByUrls = async (urls: string[]) => {
  const result = await Promise.all(urls.map(url => axios.get(url)));

  return result.map(obj => obj.data);
};

import axios from 'axios';
import { Response } from './types';

const API_KEY = '4mMZYz-F-_i0OQEMk4lkmR82JLtOjavXlOqfK2VPUNk';
axios.defaults.baseURL = 'https://api.unsplash.com';

axios.defaults.params = {
  orientation: 'landscape',
  per_page: 16,
};

export const getPhotos = async (
  query: string,
  page: number
): Promise<Response> => {
  const { data } = await axios.get<Response>(
    `/search/photos?client_id=${API_KEY}&query=${query}&page=${page}`
  );

  return data;
};

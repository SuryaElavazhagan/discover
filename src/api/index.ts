import axios from 'axios';
import { TMDB } from '../constants/tmdb';

export interface IPaginatedResponse<T> {
  page: number;
  totalPages: number;
  totalResults: number;
  items: T[];
}

const tmdb = axios.create({
  timeout: 4000,
  baseURL: TMDB.BASE_URL,
});

tmdb.interceptors.request.use((config) => {
  config.params = {
    ...config.params,
    api_key: TMDB.APIKEY
  };
  return config;
});

export {
  tmdb
};

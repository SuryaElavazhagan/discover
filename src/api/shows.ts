import { tmdb } from './index';
import { IGenre } from './movies';

async function getShows(type: string, page: number) {
  let url = '';
  switch (type) {
    case 'popular':
      url = 'tv/popular';
      break;
    case 'trend':
      url = 'trending/tv/week';
      break;
    case 'new':
      url = 'tv/on_the_air';
      break;
    case 'top':
      url = 'tv/top_rated';
      break;
  }
  const { data } = await tmdb.get(url, { params: { page } });
  
}

async function getShowGenres() {
  const { data } = await tmdb.get('/genre/tv/list');
  return (data.genres as IGenre[]).map((genre) => ({
    label: genre.name,
    value: genre.id
  }));
}

export {
  getShows,
  getShowGenres
};

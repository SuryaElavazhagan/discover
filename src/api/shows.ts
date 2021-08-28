import dayjs from 'dayjs';
import { TMDB } from '../constants/tmdb';
import { tmdb } from './index';
import { IGenre, IMovie } from './movies';

function parseShow(show: Record<string, any>): IMovie {
  const year = dayjs(show.first_air_date).year();
  return {
    poster: show?.poster_path ? `${TMDB.IMAGE_BASE_URL}${show?.poster_path}` : '',
    id: show.id,
    title: show.name,
    rating: show.vote_average,
    year
  };
}

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
  const shows = data.results.map(parseShow);

  return {
    totalPages: data.total_pages,
    totalResults: data.total_results,
    page: data.page,
    items: shows
  };
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

import { IPaginatedResponse, tmdb } from ".";
import { TMDB } from "../constants/tmdb";
import dayjs from 'dayjs';

export interface IMovie {
  poster: string;
  id: number;
  title: string;
  rating: number;
  year: number;
}

function parseMovie(movie: Record<string, any>): IMovie {
  const year = dayjs(movie.release_date).year();
  return {
    poster: movie?.poster_path ? `${TMDB.IMAGE_BASE_URL}${movie?.poster_path}` : '',
    id: movie.id,
    title: movie.title,
    rating: movie.vote_average,
    year
  };
}

async function getPopularMovies(page: number): Promise<IPaginatedResponse<IMovie>> {
  const { data } = await tmdb.get('movie/top_rated', { params: { page } });
  const movies = data.results.map(parseMovie);

  return {
    totalPages: data.total_pages,
    totalResults: data.total_results,
    page: data.page,
    items: movies
  };
}

async function getMovies(type: string, page: number): Promise<IPaginatedResponse<IMovie>> {
  let url = '';
  switch (type) {
    case 'popular':
      url = 'movie/popular';
      break;
    case 'trend':
      url = 'trending/movie/week';
      break;
    case 'new':
      url = 'movie/now_playing';
      break;
    case 'top':
      url = 'movie/top_rated';
      break;
  }
  const { data } = await tmdb.get(url, { params: { page } });
  const movies = data.results.map(parseMovie);

  return {
    totalPages: data.total_pages,
    totalResults: data.total_results,
    page: data.page,
    items: movies
  };
}

export {
  getPopularMovies,
  getMovies
};

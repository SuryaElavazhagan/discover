import { IPaginatedResponse, tmdb } from ".";
import { TMDB } from "../constants/tmdb";
import dayjs from 'dayjs';

export interface IMovie {
  poster: string;
  id: number;
  title: string;
  rating: number;
  year: number;
  genre: number[];
}

export interface IGenre {
  id: number;
  name: string;
}

export interface IDiscoverMovies {
  type: string;
  page: number;
  rating: [number, number];
  year: [number, number];
  genre: number[];
}

function parseMovie(movie: Record<string, any>): IMovie {
  const year = dayjs(movie.release_date).year();
  return {
    poster: movie?.poster_path ? `${TMDB.IMAGE_BASE_URL}${movie?.poster_path}` : '',
    id: movie.id,
    title: movie.title,
    rating: movie.vote_average,
    year,
    genre: movie.genre_ids
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

async function discoverMovie(filters: IDiscoverMovies) {
  const {
    year,
    type,
    rating,
    page,
    genre
  } = filters;
  let sortBy = '';
  switch (type) {
    case 'popular':
      sortBy = 'popularity.desc';
      break;
    case 'trend':
      sortBy = 'vote_count.desc';
      break;
    case 'new':
      sortBy = 'release_date.desc';
      break;
    case 'top':
      sortBy = 'vote_average.desc';
      break;
  }
  let releaseDateGte = dayjs(`1-1-${year[0]}`).startOf('year').format('YYYY-MM-DD');
  let releaseDateLte = dayjs(`1-1-${year[1]}`).endOf('year').format('YYYY-MM-DD');
  const { data } = await tmdb.get('discover/movie', {
    params: {
      sort_by: sortBy,
      'release_date.gte': releaseDateGte,
      'release_date.lte': releaseDateLte,
      'vote_average.gte': rating[0],
      'vote_average.lte': rating[1],
      page,
      with_genres: genre.join(',')
    }
  });
  const movies = data.results.map(parseMovie);

  return {
    totalPages: data.total_pages,
    totalResults: data.total_results,
    page: data.page,
    items: movies
  };
}

async function getMovieGenres() {
  const { data } = await tmdb.get('genre/movie/list');
  return (data.genres as IGenre[]).map((genre) => ({
    label: genre.name,
    value: genre.id
  }));
}

export {
  discoverMovie,
  getMovies,
  getMovieGenres
};

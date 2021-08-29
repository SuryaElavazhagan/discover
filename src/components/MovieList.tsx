import { useState } from "react";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Loader from "react-loader-spinner";
import ReactPaginate from 'react-paginate';

import { IPaginatedResponse } from "../api";
import { discoverMovie, getMovies, IMovie } from "../api/movies";
import Movie from "./Movie";
import { useSelector } from "react-redux";
import { IRootState } from "../store";
import { discoverShow, getShows } from "../api/shows";
import { isDefaultValue } from "../constants/filters";

/**
 * My actual plan was to make this a reuseable component,
 * but just to use redux - so that this app uses all basic
 * react libraries (react, router, redux).
 * 
 * All the items referred from store can be converted to
 * props i.e., type, genre, year, rating, movieGenres,
 * tvGenres
 */

function MovieList() {
  const location = useLocation();
  const type = useSelector((state: IRootState) => state.filter.type);
  const genre = useSelector((state: IRootState) => state.filter.genre);
  const year = useSelector((state: IRootState) => state.filter.year);
  const rating = useSelector((state: IRootState) => state.filter.rating);
  const movieGenres = useSelector((state: IRootState) => state.filter.movieGenres);
  const tvGenres = useSelector((state: IRootState) => state.filter.tvGenres);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [page, setPage] = useState(0);
  const [movies, setMovies] = useState<IPaginatedResponse<IMovie>>({
    totalPages: 0,
    page: 0,
    totalResults: 0,
    items: []
  });

  useEffect(() => {
    fetchMovies();
  }, [location.pathname, type, page, genre, year, rating]);

  useEffect(() => {
    if (page !== 0) {
      setPage(0);
    }
  }, [location.pathname, type, genre, year, rating]);

  function getGenre(genre: number | undefined) {
    if (genre != undefined) {
      let value;
      if (type === 'movie') {
        value = movieGenres.find((mGenre) => mGenre.value === genre);
      } else {
        value = tvGenres.find((sGenre) => sGenre.value === genre);
      }

      return value?.label ?? '';
    }

    return '';
  }

  async function fetchMovies() {
    try {
      setError('');
      setLoading(true);
      const kind = location.pathname.substring(1);
      if (type === 'movie') {
        if (!isDefaultValue(genre, year, rating)) {
          setMovies(await discoverMovie({
            page: page + 1,
            type: kind,
            genre,
            year,
            rating
          }));
        } else {
          setMovies(await getMovies(kind, page + 1));
        }
      } else {
        if (!isDefaultValue(genre, year, rating)) {
          setMovies(await discoverShow({
            page: page + 1,
            type: kind,
            genre,
            year,
            rating
          }));
        } else {
          setMovies(await getShows(kind, page + 1));
        }
      }
    } catch (e) {
      setError('Something went wrong! Please try again later.');
    } finally {
      setLoading(false);
    }
  }

  function renderList() {
    if (loading) {
      return (
        <div className="w-full h-full flex items-center justify-center">
          <Loader
            type="Puff"
            height={100}
            width={100}
          />
        </div>
      );
    } else if (error.length) {
      return (
        <div className="w-full h-full flex flex-col items-center justify-center text-white">
          { error }
          <button
            className="px-8 py4 rounded-xl bg-white text-gray-900"
            onClick={fetchMovies}
          >
            Retry
          </button>
        </div>
      );
    } else if (movies.totalResults === 0) {
      return (
        <div className="w-full h-full flex items-center justify-center text-white">
          No results found.
        </div>
      );
    } else {
      return (
        <div className="w-full h-full overflow-scroll">
          <div className="grid grid-cols-3 gap-4">
            {movies.items.map((movie) => <Movie key={movie.id} movie={movie} genre={getGenre(movie.genre[0])} />)}
          </div>
          <div className="my-8 flex justify-center" id="react-paginate">
            <ReactPaginate
              pageCount={movies.totalPages}
              initialPage={page}
              onPageChange={({ selected }) => {setPage(selected)}}
              pageRangeDisplayed={3}
              marginPagesDisplayed={3}
            />
          </div>
        </div>
      );
    }
  }

  return renderList();
}

export default MovieList;

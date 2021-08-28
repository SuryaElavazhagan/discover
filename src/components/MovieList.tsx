import { useState } from "react";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Loader from "react-loader-spinner";
import ReactPaginate from 'react-paginate';

import { IPaginatedResponse } from "../api";
import { getMovies, IMovie } from "../api/movies";
import Movie from "./Movie";

function MovieList() {
  const location = useLocation();
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
  }, [location.pathname, page]);


  async function fetchMovies() {
    try {
      setLoading(true);
      const type = location.pathname.substring(1);
      // setMovies(await getMovies(type, page + 1));
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
        <div className="w-full h-full flex items-center justify-center text-white">
          { error }
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
            {movies.items.map((movie) => <Movie key={movie.id} movie={movie} />)}
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

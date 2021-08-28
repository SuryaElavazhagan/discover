import { useState } from "react";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { IPaginatedResponse } from "../api";
import { getMovies, getPopularMovies, IMovie } from "../api/movies";
import Movie from "./Movie";

function MovieList() {
  const location = useLocation();
  const [movies, setMovies] = useState<IPaginatedResponse<IMovie>>({
    totalPages: 0,
    page: 0,
    totalResults: 0,
    items: []
  });

  useEffect(() => {
    fetchMovies();
  }, [location.pathname]);


  async function fetchMovies() {
    const type = location.pathname.substring(1);
    setMovies(await getMovies(type, 1));
  }

  return (
    <div className="w-full h-full overflow-scroll grid grid-cols-3 gap-4">
      {
        movies.items.map((movie) => <Movie movie={movie} />)
      }
    </div>
  );
}

export default MovieList;

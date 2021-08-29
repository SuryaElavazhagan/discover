import { IMovie } from "../api/movies";

interface IMovieProps {
  movie: IMovie;
  genre: string;
}

/**
 * Usage:
 * 
 * <Movie
 *  movie={movie}
 *  genre={genre}
 * />
 */

function Movie({ movie, genre }: IMovieProps) {
  return (
    <div className="flex flex-col items-center">
      <img
        src={movie.poster}
        alt="Movie Poster"
        className="w-60 h-96 object-contain"
      />
      <p className="text-blue-500 font-bold py-1">
        { movie.title }
      </p>
      <p className="text-gray-500 font-light text-sm">{genre}, { movie.year }</p>
    </div>
  );
}

export default Movie;
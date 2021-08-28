import { useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";

import Header from './components/Header';
import MovieList from "./components/MovieList";
import Filter from "./components/Filter";
import { getMovieGenres } from "./api/movies";
import { useDispatch } from "react-redux";
import { changeMovieGenres, changeTvGenres } from "./store";
import { getShowGenres } from "./api/shows";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    loadGenres();
  }, []);

  async function loadGenres() {
    const [
      movieGenres,
      tvGenres
    ] = await Promise.all([getMovieGenres(), getShowGenres()])
    dispatch(changeMovieGenres(movieGenres));
    dispatch(changeTvGenres(tvGenres));
  }

  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Redirect to="/popular" />
        </Route>
        <Route path="*">
          <div className="app flex bg-gray-800 w-screen	h-screen overflow-hidden">
            <div className="flex-1 p-6">
              <Header />
              <div className="p-6 w-full h-full">
                <MovieList />
              </div>
            </div>
            <Filter />
          </div>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;

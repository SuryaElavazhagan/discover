import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";

import Header from './components/Header';
import MovieList from "./components/MovieList";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Redirect to="/popular" />
        </Route>
        <Route path="*">
          <div className="app flex p-6 bg-gray-800 w-screen	h-screen overflow-hidden">
            <div className="flex-1">
              <Header />
              <div className="p-6 w-full h-full">
                <MovieList />
              </div>
            </div>
          </div>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;

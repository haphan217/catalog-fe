import BackToTop from "components/layout/BackToTop";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import HomePage from "view/HomePage";
import MovieDetails from "view/MovieDetails";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <BackToTop />
        <Switch>
          <Route path="/genres">
            <HomePage />
          </Route>
          <Route path="/movie">
            <MovieDetails />
          </Route>
          <Redirect from="*" to="/genres" />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;

import { useState } from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import BackToTop from "components/layout/BackToTop";
import TopNav from "components/layout/TopNav";
import HomePage from "view/HomePage";
import MovieDetails from "view/MovieDetails";
import Login from "view/LoginPage";
import Signup from "view/Signup";

function App() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  return (
    <div className="App">
      <BrowserRouter>
        <BackToTop />
        <TopNav isOpen={isOpen} setIsOpen={setIsOpen} />
        <Switch>
          <Route path="/genres">
            <HomePage isOpen={isOpen} />
          </Route>
          <Route
            path="/movie/:id"
            render={(routeProps) => {
              const movieId = parseInt(routeProps.match.params.id);
              return <MovieDetails movieId={movieId} />;
            }}
          />
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/signup">
            <Signup />
          </Route>
          <Redirect from="*" to="/genres/recent" />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;

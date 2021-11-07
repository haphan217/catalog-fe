import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import BackToTop from "components/layout/BackToTop";
import HomePage from "view/HomePage";
import MovieDetails from "view/MovieDetails";
import TopNav from "components/layout/TopNav";
import { useState } from "react";
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
          <Route path="/movie">
            <MovieDetails />
          </Route>
          <Redirect from="*" to="/genres/recent" />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;

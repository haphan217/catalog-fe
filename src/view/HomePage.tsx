import GenresList from "components/HomePage/GenresList";
import MovieList from "components/HomePage/MovieList";
import RecentlyAdded from "components/HomePage/RecentlyAdded";
import { Redirect, Route, Switch, useRouteMatch } from "react-router-dom";

export default function HomePage() {
  const { path } = useRouteMatch();
  return (
    <div>
      <GenresList />
      <Switch>
        <Route path={`${path}/recent`}>
          <RecentlyAdded />
        </Route>
        <Route path={`${path}/:id`}>
          <MovieList />
        </Route>
        <Redirect from="/" to="recent" />
      </Switch>
    </div>
  );
}

import GenresList from "components/HomePage/GenresList";
import MovieList from "components/HomePage/MovieList";
import RecentlyAdded from "components/HomePage/RecentlyAdded";
import { Redirect, Route, Switch, useRouteMatch } from "react-router-dom";
import { PageLayout } from "@ahaui/react";

interface Props {
  isOpen: boolean;
}

export default function HomePage({ isOpen }: Props) {
  const { path } = useRouteMatch();
  return (
    <PageLayout>
      <PageLayout.Body className="u-flexColumn">
        <div className="Grid">
          <GenresList isOpen={isOpen} />
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
      </PageLayout.Body>
    </PageLayout>
  );
}

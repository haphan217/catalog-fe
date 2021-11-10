import { Redirect, Route, Switch, useRouteMatch } from "react-router-dom";
import { PageLayout } from "@ahaui/react";
import CategoryList from "components/HomePage/CategoryList";
import ItemList from "components/HomePage/ItemList";
import RecentlyAdded from "components/HomePage/RecentlyAdded";

interface Props {
  isOpen: boolean;
}

export default function HomePage({ isOpen }: Props) {
  const { path } = useRouteMatch();
  return (
    <PageLayout>
      <PageLayout.Body className="u-flexColumn">
        <div className="Grid">
          <CategoryList isOpen={isOpen} />
          <Switch>
            <Route path={`${path}/recent`}>
              <RecentlyAdded />
            </Route>
            <Route
              path={`${path}/:id`}
              render={(routeProps) => {
                const categoryId = parseInt(routeProps.match.params.id);
                return <ItemList categoryId={categoryId} />;
              }}
            />
            ;
            <Redirect from="/" to="recent" />
          </Switch>
        </div>
      </PageLayout.Body>
    </PageLayout>
  );
}

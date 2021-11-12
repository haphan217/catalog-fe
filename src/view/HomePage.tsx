import { Route, Switch, useRouteMatch, useLocation, useHistory } from "react-router-dom";
import { PageLayout } from "@ahaui/react";
import CategoryList from "components/HomePage/CategoryList";
import ItemList from "components/HomePage/ItemList";
import { useEffect, useState } from "react";
import { Category } from "utils/Types";

interface Props {
  isOpen: boolean;
}

export default function HomePage({ isOpen }: Props) {
  const { path } = useRouteMatch();
  const location = useLocation();
  const history = useHistory();
  const [categories, setCategories] = useState<Category[]>();

  useEffect(() => {
    //fetch categories
    if (!location.pathname.split("/")[2]) {
      history.push("category/1");
    }
  }, []);

  return (
    <PageLayout>
      <PageLayout.Body className="u-flexColumn">
        <div className="Grid">
          <CategoryList isOpen={isOpen} categoryList={[]} />
          <Switch>
            <Route
              path={`${path}/:id`}
              render={(routeProps) => {
                //get the category in the category list that match the route
                const categoryId = parseInt(routeProps.match.params.id);
                return <ItemList categoryId={categoryId} />;
              }}
            />
          </Switch>
        </div>
      </PageLayout.Body>
    </PageLayout>
  );
}

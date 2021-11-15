import { useState } from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import BackToTop from "components/layout/BackToTop";
import TopNav from "components/layout/TopNav";
import HomePage from "view/HomePage";
import ItemDetails from "view/ItemDetails";
import Login from "view/LoginPage";
import Signup from "view/Signup";

function App() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  return (
    <div className="App">
      {/* <BrowserRouter> */}
      <BackToTop />
      <TopNav isOpen={isOpen} setIsOpen={setIsOpen} />
      <Switch>
        <Route path="/category">
          <HomePage isOpen={isOpen} />
        </Route>
        <Route
          path="/item/:id"
          render={(routeProps) => {
            const itemId = parseInt(routeProps.match.params.id);
            return <ItemDetails itemId={itemId} />;
          }}
        />
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/signup">
          <Signup />
        </Route>
        <Redirect from="*" to="/category" />
      </Switch>
      {/* </BrowserRouter> */}
    </div>
  );
}

export default App;

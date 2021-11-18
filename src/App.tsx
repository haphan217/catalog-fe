import { Route, Switch, Redirect } from "react-router-dom";
import TopNav from "components/layout/TopNav";
import HomePage from "components/view/HomePage";
import Login from "components/view/LoginPage";
import Signup from "components/view/Signup";
import ModalContainer from "components/layout/ModalContainer";
import { ToastContainer } from "@ahaui/react";

function App() {
  return (
    <div className="App">
      <TopNav />
      <ModalContainer />
      <ToastContainer autoDismiss={2000} />
      <Switch>
        <Route exact path="/">
          <HomePage />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/register">
          <Signup />
        </Route>
        <Redirect from="*" to="/" />
      </Switch>
    </div>
  );
}

export default App;

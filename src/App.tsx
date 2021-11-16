import { useState } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import TopNav from "components/layout/TopNav";
import HomePage from "view/HomePage";
import Login from "view/LoginPage";
import Signup from "view/Signup";
import ModalContainer from "components/layout/ModalContainer";

function App() {
  return (
    <div className="App">
      <TopNav />
      <ModalContainer />
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

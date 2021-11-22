import { Route, Switch, Redirect } from "react-router-dom";
import { ToastContainer } from "@ahaui/react";
import { useSelector } from "react-redux";
import TopNav from "components/layout/TopNav";
import HomePage from "components/view/HomePage";
import Login from "components/view/LoginPage";
import Signup from "components/view/Signup";
import ModalContainer from "components/layout/ModalContainer";
import RedirectRoute from "components/layout/RedirectRoute";
import { selectUser } from "store/slices/userSlice";

function App() {
  const profile = useSelector(selectUser);

  return (
    <div className="App">
      <TopNav />
      <ModalContainer />
      <ToastContainer autoDismiss={2000} />
      <Switch>
        <Route exact path="/">
          <HomePage />
        </Route>
        <RedirectRoute path="/login" profile={profile} component={Login} />
        <RedirectRoute path="/register" profile={profile} component={Signup} />
        <Redirect from="*" to="/" />
      </Switch>
    </div>
  );
}

export default App;

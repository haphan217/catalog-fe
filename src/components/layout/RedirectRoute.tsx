import * as React from "react";
import { Route, Redirect, RouteComponentProps } from "react-router-dom";
import type { RouteProps } from "react-router-dom";
import { SliceState } from "store/slices/userSlice";

interface RedirectRouteParams extends RouteProps {
  component: React.ComponentType<RouteComponentProps<any>> | React.ComponentType<any>;
  profile: SliceState;
}

const RedirectRoute = ({ profile, component: Component, ...rest }: RedirectRouteParams) => {
  return (
    <Route {...rest} render={(props) => (profile.isAuthenticated ? <Redirect to="/" /> : <Component {...props} />)} />
  );
};

export default RedirectRoute;

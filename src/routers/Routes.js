import React from "react";
import { Switch, Route } from "react-router-dom";
import SignIn from ".././components/SignIn";
import SignUp from ".././components/SignUp";
import Dashboard from "../components/Dashboard";
import { Redirect } from 'react-router';
import AuthApi from "../utils/AuthApi";
function Routes() {
  return (
    <Switch>
    
      <RouteRegisteration path="/signin" component={SignIn} />
      <RouteRegisteration path="/signup" component={SignUp} />
      <RouteProtected path="/dashboard" component={Dashboard} />
      <Route path="**" component={SignIn} />
    </Switch>
  );
}

const RouteRegisteration = ({ component: Component, ...rest }) => {
  const authApi = React.useContext(AuthApi);
  return (
    <Route
      {...rest}
      render={(props) =>
        !authApi.auth ? <Component {...props} /> : <Redirect to="/dashboard" />
      }
    />
  );
};

const RouteProtected = ({ component: Component, ...rest }) => {
  const authApi = React.useContext(AuthApi);

  return (
    <Route
      {...rest}
      render={(props) =>
        authApi.auth ? <Component {...props} /> : <Redirect to="/signin" />
      }
    />
  );
};
export default Routes;

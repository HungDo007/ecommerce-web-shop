import React from "react";
import { Route, Redirect } from "react-router-dom";

const PrivateRoute = ({ component: Component, currentUSer, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        currentUSer ? <Component {...props} /> : <Redirect to="/signin" />
      }
    />
  );
};

export default PrivateRoute;

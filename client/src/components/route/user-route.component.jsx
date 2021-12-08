import React from "react";
import { Route, Redirect } from "react-router-dom";

const UserRoute = ({ component: Component, currentUser, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        currentUser ? (
          currentUser.role === "User" ? (
            <Component {...props} />
          ) : (
            <Redirect to="/admin" />
          )
        ) : (
          <Redirect to="/signin" />
        )
      }
    />
  );
};

export default UserRoute;

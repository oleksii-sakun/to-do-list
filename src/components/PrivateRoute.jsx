import React from "react";
import { Redirect, Route } from "react-router-dom";

export const PrivateRoute = ({ component: Component, isSinged, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        return isSinged ? (
          <Component {...props} {...rest} />
        ) : (
          <Redirect to="/" />
        );
      }}
    />
  );
};

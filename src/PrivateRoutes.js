import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";
import { getName } from "./helpers";

const PrivateRoutes = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        getName() ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{ pathname: "/login", state: { from: props.location } }}
          />
        )
      }
    ></Route>
  );
};

export default PrivateRoutes;

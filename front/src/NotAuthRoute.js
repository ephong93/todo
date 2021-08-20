import React from "react";
import { Route, Redirect } from "react-router-dom";

function NotAuthRoute({ authenticated, render, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) =>
        !authenticated ? (
            render(props)
          ) : (
          <Redirect
            to={{ pathname: "/main" }}
          />
        )
      }
    />
  );
}

export default NotAuthRoute;
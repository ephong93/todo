import React from "react";
import { Route, Redirect } from "react-router-dom";

function AuthRoute({ authenticated, render, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) =>
        authenticated ? (
            render(props)
          ) : (
          <Redirect
            to={{ pathname: "/login" }}
          />
        )
      }
    />
  );
}

export default AuthRoute;
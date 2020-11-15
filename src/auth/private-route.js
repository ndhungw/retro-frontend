import React from "react";
import { Route } from "react-router-dom";
import { Redirect } from "react-router-dom";
import useAuth from "../context/auth";

export default function PrivateRoute({ component: Component, ...rest }) {
  const { authTokens } = useAuth();
  console.log("PrivateRoute: authTokens", authTokens);

  return (
    <Route
      {...rest}
      render={(props) =>
        // isAuthenticated ?
        authTokens ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{ pathname: "/login", state: { referer: props.location } }}
            // to="/login"
          />
        )
      }
    />
  );
}

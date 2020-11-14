import React from "react";
import { Redirect, Route } from "react-router-dom";
import useAuth from "../context/auth";

export default function PrivateRoute({ component: Component, ...rest }) {
  //   const isAuthenticated = useAuth();
  //   console.log("PrivateRoute: isAuthenticated", isAuthenticated);
  const { authTokens } = useAuth();

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

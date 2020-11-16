import React from "react";
import { Redirect, Route } from "react-router-dom";
import useAuth from "../context/auth";

export default function PrivateRoute(props) {
  const { children, ...rest } = props;
  const { authTokens } = useAuth();
  return authTokens ? (
    <Route {...rest}>{children}</Route>
  ) : (
    <Redirect to="/login" />
  );
}

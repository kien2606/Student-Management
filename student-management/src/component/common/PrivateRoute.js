import { Redirect, Route } from "react-router-dom";

import React from "react";

export default function PrivateRoute(props) {
  // check if user is logged in?
  // ? --> show : --> prevent
  const isLoggedIn = Boolean(localStorage.getItem("access_token"));
  if (!isLoggedIn) {
    return <Redirect to="/login" />;
  }
  return <Route {...props} />;
}

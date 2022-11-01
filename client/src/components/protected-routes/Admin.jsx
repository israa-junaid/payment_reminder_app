import React from "react";
import { Redirect, Route } from "react-router-dom";

function Admin({ component: Component, ...restOfProps }) {
  let isAuthenticated = null;
  if (localStorage.getItem("token") == null || undefined) {
    isAuthenticated = false;
  } else if (localStorage.getItem("role") == "admin") isAuthenticated = true;

  return (
    <Route
      {...restOfProps}
      render={(props) =>
        isAuthenticated ? <Component {...props} /> : <Redirect to="/" />
      }
    />
  );
}
export default Admin;

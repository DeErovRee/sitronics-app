import React from "react";
import { Route, Outlet, Navigate } from "react-router-dom";

export const PublicRoute = ({ authenticated, ...rest }) => {
  return !authenticated ? (
    <React.Fragment {...rest} />
  ) : (
    <Navigate to="/personalArea" />
  );
};

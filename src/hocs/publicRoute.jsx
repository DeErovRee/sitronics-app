import React from "react";
import { Navigate } from "react-router-dom";

export const PublicRoute = ({ authenticated, ...rest }) => {
  return !authenticated ? (
    <React.Fragment {...rest} />
  ) : (
    <Navigate to="/personalArea" />
  );
};

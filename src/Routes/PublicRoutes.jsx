import React from "react";
import { useContext } from "react";
import { ContextApi } from "../context/ContextProvider";
import { Navigate } from "react-router-dom";

const PublicRoutes = ({ children }) => {
  const { loggin } = useContext(ContextApi);

  if (loggin) {
    return <Navigate to="/app/home" replace />;
  }
  return children;
};

export default PublicRoutes;

import React from "react";
import { useContext } from "react";
import { ContextApi } from "../context/ContextProvider";
import { Navigate } from "react-router-dom";

const PrivateRoutes = ({ children }) => {
  const { loggin } = useContext(ContextApi);

  if (!loggin) {
    return <Navigate to="/" replace />;
  }
  return children;
};

export default PrivateRoutes;

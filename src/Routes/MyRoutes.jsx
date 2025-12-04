import React from "react";
import { createBrowserRouter } from "react-router";
import App from "../App";
import Login from "../pages/Auth/Login";
import Home from "../pages/Gen/Home";
import Error from "../pages/Gen/ErrorPage";
import Register from "../pages/Auth/Register";

const MyRoutes = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <Error />,
    children: [
      {
        path: "",
        element: <Home />,
      },{
        path: "login",
        element: <Login />,
      },{
        path: "register",
        element: <Register />,
      }
    ],
  },
  {
    path: "*",
    element:<Error />,
  },
]);

export default MyRoutes;

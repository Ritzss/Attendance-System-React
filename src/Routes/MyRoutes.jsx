import React from "react";
import { createBrowserRouter } from "react-router";
import App from "../App";
import Home from "../pages/Home";
import Error from "../pages/Error";

const MyRoutes = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <Home />,
      },
    ],
  },
  {
    path:"*",
    element:<Error />
  },
]);

export default MyRoutes;

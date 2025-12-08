import React from "react";
import { createBrowserRouter } from "react-router";
import App from "../App";
import Login from "../pages/Auth/Login";
import Home from "../pages/Gen/Home";
import Error from "../pages/Gen/ErrorPage";
import Register from "../pages/Auth/Register";
import Contactus from "../pages/Services/Contactus";
import Leaveportal from "../pages/Services/Leaveportal";
import Attendance from "../pages/Services/Attendance";
import Break from "../pages/Services/Break";
import Holiday from "../pages/Services/Holiday";

const MyRoutes = createBrowserRouter([
  // --------------------------- LOGIN FIRST ---------------------------
  {
    path: "/",
    element: <Login />,
    errorElement: <Error />,   // Catches errors inside Login + loaders
  },

  {
    path: "/register",
    element: <Register />,
    errorElement: <Error />,
  },

  // --------------------------- MAIN APP ROUTES ----------------------
  {
    path: "/app",
    element: <App />,
    errorElement: <Error />,  // Handles layout & child errors
    children: [
      {
        path: "home",
        element: <Home />,
        errorElement: <Error />,
      },
      {
        path: "home/leaveportal",
        element: <Leaveportal />,
        errorElement: <Error />,
      },
      {
        path: "home/attendance",
        element: <Attendance />,
        errorElement: <Error />,
      },
      {
        path: "home/break",
        element: <Break />,
        errorElement: <Error />,
      },
      {
        path: "home/holiday",
        element: <Holiday />,
        errorElement: <Error />,
      },
      {
        path: "home/contactus",
        element: <Contactus />,
        errorElement: <Error />,
      },
    ],
  },

  // --------------------------- FALLBACK (MUST STAY LAST) ---------
  {
    path: "*",
    element: <Error />,
  },
]);

export default MyRoutes;

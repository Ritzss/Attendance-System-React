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
    element: <Login />, // default landing page
    errorElement: <Error />,
  },

  {
    path: "/register",
    element: <Register />,
  },

  // --------------------------- MAIN APP ROUTES ----------------------
  {
    path: "/app",
    element: <App />, // contains Navbar + Outlet
    children: [
      {
        path: "home",
        element: <Home />,
      },
      {
        path: "home/leaveportal",
        element: <Leaveportal />,
      },
      {
        path: "home/attendance",
        element: <Attendance />,
      },
      {
        path: "home/break",
        element: <Break />,
      },
      {
        path: "home/holiday",
        element: <Holiday />,
      },
      {
        path: "home/contactus",
        element: <Contactus />,
      },
    ],
  },

  // --------------------------- FALLBACK -----------------------------
  {
    path: "*",
    element: <Error />,
  },
]);

export default MyRoutes;

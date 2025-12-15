import React from "react";
import { createBrowserRouter } from "react-router-dom";
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
import PrivateRoutes from "./PrivateRoutes";
import PublicRoutes from "./PublicRoutes";
import ForgotPassword from "../pages/Auth/ForgotPassword";
import ResetPassword from "../pages/Auth/ResetPassword";
import Profile from "../pages/Auth/Profile";

const MyRoutes = createBrowserRouter([
  // --------------------------- LOGIN FIRST ---------------------------
  {
    path: "/",
    element: (
      <PublicRoutes>
        <Login />
      </PublicRoutes>
    ),
    errorElement: <Error />, // Catches errors inside Login + loaders
  },

  {
    path: "/register",
    element: (
      <PublicRoutes>
        <Register />
      </PublicRoutes>
    ),
    errorElement: <Error />,
  },

  {
    path:"/forgot_password",
    element:(
      <PublicRoutes>
        <ForgotPassword />
      </PublicRoutes>
    ),
    errorElement:<Error />,
  },

  {
    path:"/reset_password",
    element:(
      <PublicRoutes>
        <ResetPassword />
      </PublicRoutes>
    ),
    errorElement:<Error />,
  },

  // --------------------------- MAIN APP ROUTES ----------------------
  {
    path: "/app",
    element: (
      <PrivateRoutes>
        <App />
      </PrivateRoutes>
    ),
    errorElement: <Error />, // Handles layout & child errors
    children: [
      {
        path: "home",
        element: <Home />,
        errorElement: <Error />,
      },
      {
        path: "leaveportal",
        element: <Leaveportal />,
        errorElement: <Error />,
      },
      {
        path: "attendance",
        element: <Attendance />,
        errorElement: <Error />,
      },
      {
        path: "break",
        element: <Break />,
        errorElement: <Error />,
      },
      {
        path: "holiday",
        element: <Holiday />,
        errorElement: <Error />,
      },
      {
        path: "contactus",
        element: <Contactus />,
        errorElement: <Error />,
      },
      {
        path: "profile",
        element: <Profile />,
        errorElement: <Error />,  
      }
    ],
  },

  // --------------------------- FALLBACK (MUST STAY LAST) ---------
  {
    path: "*",
    element: <Error />,
  },
]);

export default MyRoutes;

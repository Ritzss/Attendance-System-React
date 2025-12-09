/* eslint-disable react-refresh/only-export-components */

import { createContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

export const ContextApi = createContext();

const loginInit = {
  Email: "",
  Password: "",
  Role: "",
};

const registerInit = {
  Name: "",
  Confirm_Name: "",
  Email: "",
  Address: "",
  Department: "",
  Designation: "",
  Role: "",
  Contact: "",
  Password: "",
  Confirm_Password: "",
};

const ContextProvider = ({ children }) => {
  const [visible, setVisible] = useState(false);
  const [visible2, setVisible2] = useState(false);

  const [currentUser, setCurrentUser] = useState(null);
  const [data, setData] = useState([]);

  const [authUser, setAuthUser] = useState(null);
  const [marked, setMarked] = useState(false);
  const [navTo, setNavTo] = useState();

  const [loginForm, setLoginForm] = useState(loginInit);
  const [registerForm, setRegisterForm] = useState(registerInit);

  const [loggin, setLoggin] = useState(false);
  const [showOtp, setShowOtp] = useState(false);

  // ---------------------------------------------------------
  // FETCH USERS
  // ---------------------------------------------------------
  const getUsers = async () => {
    try {
      const res = await fetch("http://localhost:3001/users");
      let users = await res.json();
      setData(users);
    } catch (err) {
      toast.error(err.message);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  // ---------------------------------------------------------
  // REGISTER USER
  // ---------------------------------------------------------
  const RegisterUser = async (payload) => {
    try {
      const res = await fetch("http://localhost:3001/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Failed to register user");

      toast.success("Registration successful");
      getUsers(); // refresh list
      return true;
    } catch (err) {
      toast.error(err.message);
      return false;
    }
  };

  // ---------------------------------------------------------
  // LOGIN USER
  // ---------------------------------------------------------
  const LoginUser = async () => {
    const { Email, Password } = loginForm;

    const found = data.find(
      (u) => u.Email === Email && u.Password === Password
    );

    if (!found) {
      toast.error("Invalid email or password");
      return false;
    }

    setAuthUser(found);
    setCurrentUser(found);
    toast.success("Login successful");
    return true;
  };

  // ---------------------------------------------------------
  // PROVIDER EXPORT
  // ---------------------------------------------------------
  return (
    <ContextApi.Provider
      value={{
        // Forms
        loginForm,
        setLoginForm,
        registerForm,
        setRegisterForm,
        loginInit,
        initRegistration: registerInit,

        // User state
        currentUser,
        setCurrentUser,
        authUser,
        setAuthUser,

        // Data
        data,
        setData,

        // UI states
        visible,
        setVisible,
        visible2,
        setVisible2,
        marked,
        setMarked,
        navTo,
        setNavTo,

        // Auth actions
        LoginUser,
        RegisterUser,

        // misc
        loggin,
        setLoggin,
        showOtp,
        setShowOtp,
      }}
    >
      {children}
    </ContextApi.Provider>
  );
};

export default ContextProvider;

/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react-hooks/set-state-in-effect */

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
  Confirm_Name:"",
  Email: "",
  Address: "",
  Department: "",
  Designation: "",
  Role: "",
  Contact: "",
  Password: "",
  Confirm_Password:"",
};

const ContextProvider = ({ children }) => {
  const [visible, setVisible] = useState(false);
  const [visible2, setVisible2] = useState(false);

  const [currentUser, setCurrentUser] = useState(null);
  const [data, setData] = useState([]);

  const [authUser, setAuthUser] = useState(null);
  const [marked, setMarked] = useState(true);
  const [navTo, setNavTo] = useState();

  // ⭐ Separate states
  const [loginForm, setLoginForm] = useState(loginInit);
  const [registerForm, setRegisterForm] = useState(registerInit);

  const [loggin, setLoggin] = useState(false);

  // Fetch API
  const getUsers = async () => {
    try {
      const res = await fetch("http://localhost:5000/users");
      let data = await res.json();
      setData(data);
    } catch (err) {
      toast.error(err.message);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <ContextApi.Provider
      value={{
        // forms
        loginForm,
        setLoginForm,
        registerForm,
        setRegisterForm,
        loginInit,
        registerInit,

        // others
        currentUser,
        setCurrentUser,
        loggin,
        setLoggin,
        data,
        setData,
        authUser,
        setAuthUser,
        marked,
        setMarked,
        visible,
        setVisible,
        visible2,
        setVisible2,
        navTo,
        setNavTo,
      }}
    >
      {children}
    </ContextApi.Provider>
  );
};

export default ContextProvider;

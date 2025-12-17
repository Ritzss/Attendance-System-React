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

const dateInit = {
  date: "",
  status: "",
};

const ContextProvider = ({ children }) => {
  const [visible, setVisible] = useState(false);
  const [visible2, setVisible2] = useState(false);
  const [open, setOpen] = useState(false);

  const [currentUser, setCurrentUser] = useState(null);
  const [data, setData] = useState([]);
  const [loginData, setLoginData] = useState([]);
  const [leaves, setLeaves] = useState([]);
  const [breakData, setBreakData] = useState([]);
  const [storageData, setStorageData] = useState([]);
  const [attendance, setAttendance] = useState([]);

  const [authUser, setAuthUser] = useState(null);
  const [marked, setMarked] = useState(false);
  const [navTo, setNavTo] = useState();

  const [loginForm, setLoginForm] = useState(loginInit);
  const [registerForm, setRegisterForm] = useState(registerInit);
  const [attendMark, setAttendMark] = useState(dateInit);

  const [loggin, setLoggin] = useState(false);
  const [showOtp, setShowOtp] = useState(false);
  const [email, setEmail] = useState("");

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

  const getAttendance = async () => {
    try {
      const res = await fetch("http://localhost:3001/attendance");
      let attendance = await res.json();
      setAttendance(attendance);
    } catch (err) {
      toast.err(err.message);
    }
  };

  const getLogin = async () => {
    try {
      const res = await fetch("http://localhost:3001/login");
      let loginD = await res.json();
      setLoginData(loginD);
    } catch (err) {
      toast.err(err.message);
    }
  };

  const updateProfileImage = async (file) => {
    if (!currentUser) return;

    const formData = new FormData();
    formData.append("image", file);
    formData.append("id", currentUser.id);

    const res = await fetch("http://localhost:5000/profile", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();

    console.log(data);

    if (data.success) {
      setCurrentUser((prev) => ({
        ...prev,
        profileimage: data.profileimage,
      }));
      toast.success("Profile image updated");
    } else {
      toast.error("Image upload failed");
    }
  };

  const getLeaves = async () => {
    try {
      const res = await fetch("http://localhost:3001/leaves");
      let LeavesD = await res.json();
      setLeaves(LeavesD);
    } catch (err) {
      toast.err(err.message);
    }
  };

  const getBreakData = async () => {
    try {
      const res = await fetch("http://localhost:3001/break");
      let breakD = await res.json();
      setBreakData(breakD);
    } catch (err) {
      toast.err(err.message);
    }
  };

  const getStorage = async () => {
    try {
      const res = await fetch("http://localhost:3001/storage");
      let storage = await res.json();
      setStorageData(storage);
    } catch (err) {
      toast.err(err.message);
    }
  };

  useEffect(() => {
    getUsers();
    getAttendance();
    getBreakData();
    getLeaves();
    getLogin();
    getStorage();
  }, []);
  useEffect(() => {
    if (currentUser) {
      localStorage.setItem("currentUser", JSON.stringify(currentUser));
    }
  }, [currentUser]);
  useEffect(() => {
    const storedUser = localStorage.getItem("currentUser");
    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser));
      setLoggin(true);
    }
  }, []);

  useEffect(() => {
    const savedUser = localStorage.getItem("currentUser");
    const savedAuthUser = localStorage.getItem("authUser");
    const savedLoggin = localStorage.getItem("loggin");

    if (savedUser && savedAuthUser && savedLoggin === "true") {
      setCurrentUser(JSON.parse(savedUser));
      setAuthUser(savedAuthUser);
      setLoggin(true);
    }
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
        loginInit,
        registerForm,
        setRegisterForm,
        initRegistration: registerInit,
        attendMark,
        setAttendMark,
        dateInit,

        // User state
        currentUser,
        setCurrentUser,
        authUser,
        setAuthUser,

        // Data
        data,
        setData,
        attendance,
        setAttendance,
        loginData,
        setLoginData,
        leaves,
        setLeaves,
        breakData,
        setBreakData,
        storageData,
        setStorageData,

        // UI states
        visible,
        setVisible,
        visible2,
        setVisible2,
        marked,
        setMarked,
        navTo,
        setNavTo,
        open,
        setOpen,

        // Auth actions
        LoginUser,
        RegisterUser,

        // misc
        loggin,
        setLoggin,
        showOtp,
        setShowOtp,
        email,
        setEmail,
        updateProfileImage,
      }}
    >
      {children}
    </ContextApi.Provider>
  );
};

export default ContextProvider;

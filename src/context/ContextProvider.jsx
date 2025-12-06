/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react-hooks/set-state-in-effect */
import { createContext, useEffect, useState } from "react";
// import { supabase } from "../lib/supabase";
import toast from "react-hot-toast";
export const ContextApi = createContext();
let initData = ["employee"];
let initRegistration = {
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
  let [visible, setVisible] = useState(false);
  let [loggin, setLoggin] = useState(false);
  let [user, setUser] = useState();
  let [data, setData] = useState();
  let [authUser, setAuthUser] = useState(initData);
  let [marked, setMarked] = useState(true);
  let [navTo, setNavTo] = useState();
  let [form, setForm] = useState(initRegistration);

  // feteching data starting
  const getUsers = async () => {
    try {
      const res = await fetch("http://localhost:5000/users");
      let data = await res.json();
      console.log(data);
      setData(data);
    } catch (err) {
      toast.error(err.message);
    }
  };

  useEffect(() => {
    toast.success(genRandINT());

    getUsers();
  }, []);
  //ending

  let genRandINT = (length = 12) => {
    const chars =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let id = "";
    for (let i = 0; i <= length; i++) {
      id += chars[Math.floor(Math.random() * chars.length)];
    }
    return id;
  };

  const AddUser = (Uobj) => {
    setData((prevs) => [...prevs, { id: genRandINT(), ...Uobj }]);
    toast.success("Users Saved You are a genius");
  };

  const getUserbyEmail = (email) => {
    return data.find((u) => {
      u.email === email;
    });
  };

  const Update = (id, Obj) => {
    setData((prev) =>
      prev.map((u) => {
        u.id === id ? { ...u, ...Obj } : u;
      })
    );
  };

  const Delete = (id) => {
    setData((prev) =>
      prev.filter((d) => {
        d.id !== id;
      })
    );
  };

  return (
    <ContextApi.Provider
      value={{
        user,
        setUser,
        initRegistration,
        data,
        setData,
        loggin,
        setLoggin,
        authUser,
        setAuthUser,
        marked,
        setMarked,
        visible,
        setVisible,
        navTo,
        setNavTo,
        form,
        setForm,
      }}
    >
      {children}
    </ContextApi.Provider>
  );
};

export default ContextProvider;

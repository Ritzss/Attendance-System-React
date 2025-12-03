/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react-hooks/set-state-in-effect */
import { createContext, useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
export const ContextApi = createContext();

const ContextProvider = ({ children }) => {
  let [loggin, setLoggin] = useState(false);
  let [user, setUser] = useState();
  let [data, setData] = useState();
  let [authUser, setAuthUser] = useState();
  let [marked,setMarked] = useState(false);

  const getUsers = async () => {
    const { data, error } = await supabase.from("profiles").select("*");
    console.log(data);
    if (error) {
      console.error("Error Fetching:", error);
      return;
    } else {
      setData(data[0]);
      if (data?.name) {
        setLoggin(true);
      }
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <ContextApi.Provider
      value={{
        user,
        setUser,
        data,
        setData,
        loggin,
        setLoggin,
        authUser,
        setAuthUser,
        marked,
        setMarked,
      }}
    >
      {children}
    </ContextApi.Provider>
  );
};

export default ContextProvider;

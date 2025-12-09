import React, { useContext } from "react";
import { ContextApi } from "../../context/ContextProvider";
import { NavLink, useNavigate } from "react-router";

const AuthNav = () => {
  const { loggin, setLoggin,currentUser, setCurrentUser } = useContext(ContextApi);
  // console.log(user,setUser,data);
  let navigate = useNavigate();

  return (
    <div>
      {loggin ? (
        <span className="flex gap-2">
          <span>{currentUser?.Name}</span>
          <span>
            <button
              onClick={() => {
                setLoggin(false);
                setCurrentUser(null);
                navigate("/");
              }}
            >
              Logout
            </button>
          </span>
        </span>
      ) : (
        <span className="flex gap-2">
          <span>
            <NavLink to={"/"}>Login</NavLink>
          </span>
          /
          <span>
            <NavLink to={"/register"}>Register</NavLink>
          </span>
        </span>
      )}
    </div>
  );
};

export default AuthNav;

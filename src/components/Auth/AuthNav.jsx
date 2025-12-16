import React, { useContext } from "react";
import { ContextApi } from "../../context/ContextProvider";
import { NavLink, useNavigate } from "react-router";

const AuthNav = () => {
  const { loggin, setLoggin, currentUser,setCurrentUser, setAuthUser } =
    useContext(ContextApi);
  // console.log(user,setUser,data);
  let navigate = useNavigate();

  return (
    <div>
      {loggin ? (
        <span className="flex gap-2">
          <NavLink to={`profile/${currentUser?.id}`}>{currentUser?.Name}</NavLink>
          <span>
            <button
              onClick={() => {
                setCurrentUser(null);
                setAuthUser(null);
                setLoggin(false);

                localStorage.removeItem("currentUser");
                localStorage.removeItem("authUser");
                localStorage.removeItem("loggin");
                navigate("/");
              }}
            >
              Logout
            </button>
          </span>
        </span>
      ) : (
        <span className="flex gap-5">
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

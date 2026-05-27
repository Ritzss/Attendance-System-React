import React, { useContext } from "react";
import { ContextApi } from "../../context/ContextProvider";
import { NavLink, useNavigate } from "react-router";
import CoinFlipAvatar from "../UI/CoinFlipAvatar";

const AuthNav = () => {
  const { loggin, setLoggin, currentUser,setCurrentUser, setAuthUser } =
    useContext(ContextApi);
  // console.log(user,setUser,data);
  let navigate = useNavigate();

  return (
    <div>
      {loggin ? (
        <span className="flex justify-around items-center gap-2">
          <div className="ImgBlock1 rounded-full shadow-[inset_0_0_20px_rgba(0,0,0,0.7)] bg-[#000000]  w-[7vh] h-[7vh] flex items-center justify-center">
          {currentUser?.profileimage ? (
            <img
              className="w-full h-full rounded-full"
              style={{
                border: currentUser?.marked ? "3px solid green" : "3px solid red",
              }}
              src={`http://localhost:5000${currentUser?.profileimage}`}
              alt="ProfilePic"
            />
          ) : (
            <CoinFlipAvatar />
          )}
        </div>
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

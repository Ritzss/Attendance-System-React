import React from "react";
import WelcomeCard from "../../components/home/WelcomeCard";
import MiniCard from "../../components/home/MiniCard";

const Login = () => {
  return (
    <div className="flex flex-col p-7 justify-evenly border shadow-[inset_0_0_20px_rgba(0,0,0,0.7)] border-white rounded-4xl w-[75vh] mx-100 h-[75vh]">
        <MiniCard color={"#ffffff50"} />
        <MiniCard color={"#ffffff50"} />
    </div>
  );
};

export default Login;

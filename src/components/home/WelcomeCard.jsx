import React from "react";
import CoinFlipAvatar from "../UI/CoinFlipAvatar";

//! HAVE TO MAKE IT RESPONSIVE

const WelcomeCard = ({ data }) => {
  console.log(data);
  console.log(data.marked);

  return (
    <div className="Welcome Block flex p-7 justify-between   rounded-4xl w-full h-[65vh]">
      {/* Left */}
      <div className="w-[48%] p-5 h-full rounded-4xl">
        <div className="rounded-full shadow-[inset_0_0_20px_rgba(0,0,0,0.7)] bg-[#000000] -m-5 w-[35vh] h-[35vh] flex items-center justify-center">
          {data?.profile_image ? (
            <img
              className="w-[40vh] h-[35vh] rounded-full"
              style={{
                border: data.marked ? "10px solid green" : "10px solid red",
              }}
              src={data.profile_image}
              alt="ProfilePic"
            />
          ) : (
            <CoinFlipAvatar />
          )}
        </div>

        <div className="rounded-2xl shadow-[inset_0_0_20px_rgba(0,0,0,0.7)] -mt-[10vh] ml-[4vh] w-[45vw] h-[30vh] p-5">
          <h1 className="text-white text-3xl text-right">
            Welcome Back, {data?.Name}!
          </h1>
          <p className="text-white text-lg mt-5">
            Welcome back to the flow! Your data is synced, your tasks are ready,
            and your energy is unmatched.
            <br />
            <span className="text-3xl font-semibold bg-linear-to-r from-teal-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">
              Let’s create something awesome today.
            </span>
          </p>
        </div>
      </div>

      {/* Right */}
      <div className="flex flex-col gap-18 justify-between py-10 w-[41%]">
        {/* Today's attendance */}
        <div className="flex flex-col p-5 rounded-2xl shadow-[inset_0_0_20px_rgba(0,0,0,0.7)] w-full h-[48%]">
          <div className="text-white text-4xl">Today's Attendance:</div>
          <div className="flex justify-end px-9 text-white text-6xl">
            {data?.marked ? "1" : "0"}/1
          </div>
        </div>

        {/* Mark Attendance */}
        <div className="rounded-2xl shadow-[inset_0_0_20px_rgba(0,0,0,0.7)] w-full h-[48%]">
          <div className="text-white p-3 text-4xl">Mark Attendance:</div>

          <div
            className={`text-white text-2xl text-center m-5 p-3 rounded-2xl shadow-[inset_0_0_13px_rgba(255,255,255,0.7)] 
              hover:cursor-pointer hover:scale-105 duration-300`}
            style={{ backgroundColor: data?.marked ? "green" : "red" }}
          >
            {data?.marked ? "Attendance Marked" : "Mark Attendance"}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomeCard;

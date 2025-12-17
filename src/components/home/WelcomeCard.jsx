import React from "react";
import CoinFlipAvatar from "../UI/CoinFlipAvatar";
import { useEffect } from "react";
import { useContext } from "react";
import { ContextApi } from "../../context/ContextProvider";
import FaceRecognition from "../../Models/FaceReconginition";

//! HAVE TO MAKE IT RESPONSIVE

const WelcomeCard = ({ data }) => {
  const { open, setOpen } = useContext(ContextApi);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [open]);

  const handleAttendance = () => {
    setOpen(true);
  };

  return (
    <div className="WelcomeBlock flex p-7 justify-between rounded-4xl w-full ">
      {/* Left */}
      <div id="LeftWelcome" className="p-5  rounded-4xl">
        <div className="ImgBlock1 rounded-full shadow-[inset_0_0_20px_rgba(0,0,0,0.7)] bg-[#000000] -m-5 w-[35vh] h-[35vh] flex items-center justify-center">
          {data?.profileimage ? (
            <img
              className="w-[40vh] h-[35vh] rounded-full"
              style={{
                border: data.marked ? "10px solid green" : "10px solid red",
              }}
              src={`http://localhost:5000${data.profileimage}`}
              alt="ProfilePic"
            />
          ) : (
            <CoinFlipAvatar />
          )}
        </div>

        <div className="TextBlock rounded-2xl shadow-[inset_0_0_20px_rgba(0,0,0,0.7)] -mt-[10vh] ml-[4vh] p-5">
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
      <div id="RightWelcome" className="flex flex-col justify-between  w-[41%]">
        {/* Today's attendance */}
        <div className="flex flex-col p-5 rounded-2xl shadow-[inset_0_0_20px_rgba(0,0,0,0.7)] w-full ">
          <div className="text-white text-4xl">Today's Attendance:</div>
          <div className="flex justify-end px-9 text-white text-6xl">
            {data?.marked ? "1" : "0"}/1
          </div>
        </div>

        {/* Mark Attendance */}
        <div className="rounded-2xl shadow-[inset_0_0_20px_rgba(0,0,0,0.7)] w-full ">
          <div className="text-white p-3 text-4xl">Mark Attendance:</div>

          <div
            className={`text-white text-2xl text-center m-5 p-3 rounded-2xl shadow-[inset_0_0_13px_rgba(255,255,255,0.7)] 
              hover:cursor-pointer hover:scale-105 duration-300`}
            style={{ backgroundColor: data?.marked ? "green" : "red" }}
            onClick={handleAttendance}
          >
            {data?.marked ? "Attendance Marked" : "Mark Attendance"}
          </div>
        </div>
        <div
          className={`fixed top-0 left-0 w-full p-15 h-screen flex flex-col justify-between items-center z-1 bg-[#00000099] transition-opacity duration-300 ease-in-out ${
            open
              ? "opacity-100 scale-100 pointer-events-auto"
              : "opacity-0 scale-95 pointer-events-none"
          } `}
        >
          <div
            className="self-end w-[3%] flex flex-col relative items-end h-[3%]"
            onClick={() => setOpen(false)}
          >
            <div className="bg-white h-[40%] w-full rotate-45"></div>
            <div className="absolute bg-white h-[40%] w-full -rotate-45"></div>
          </div>
          <div>
            <FaceRecognition onSuccess={() => console.log("Face detected")} />
          </div>
          <div></div>
        </div>
      </div>
    </div>
  );
};

export default WelcomeCard;

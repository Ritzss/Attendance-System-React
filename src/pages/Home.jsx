import React from "react";
import { useContext } from "react";
import { ContextApi } from "../context/ContextProvider";
import CoinFlipAvatar from "../components/UI/CoinFlipAvatar";

const Home = () => {
  let { data ,marked } = useContext(ContextApi);
  console.log("Home Data:", data);

  let src = data?.profile_image;

  return (
    <section key={1} className=" flex flex-col gap-y-1">
      {/* First Block Completed-UI BackendLogin-pending*/}
      <article
        key={16}
        className="rounded-4xl m-5 flex justify-around items-center flex-wrap gap-y-0 gap-x-1 h-[60vh] "
      >
        <div
          key={17}
          className="flex p-7 justify-between bg-[#ffffff20] border shadow-[inset_0_0_20px_rgba(0,0,0,0.7)] border-white rounded-4xl w-full h-[60vh]"
        >
          {/* First Block Left side */}
          <div className=" w-[48%] p-5 h-full rounded-4xl ">
            <div className=" rounded-full shadow-[inset_0_0_20px_rgba(0,0,0,0.7)] -m-5 w-[35vh] h-[35vh]">
              {src ? (
                <img
                  className="w-[30vh] h-[30vh] rounded-full "
                  style={{border:"4px red"}}
                  src={src}
                  alt="ProfilePic"
                />
              ) : (
                <CoinFlipAvatar />
              )}
            </div>
            <div className=" rounded-2xl shadow-[inset_0_0_20px_rgba(0,0,0,0.7)] -mt-[12vh] ml-[8vh] w-[45vw] h-[30vh]">
              <h1 className="text-white text-3xl p-5 text-right">
                Welcome Back , {data?.name}!
              </h1>
              <div className="text-white text-lg p-5">
                Welcome back to the flow! Your data is synced, your tasks are
                ready, and your energy is unmatched.
                <div className="text-3xl font-semibold bg-linear-to-r from-teal-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">
                  Let’s create something awesome today.
                </div>
              </div>
            </div>
          </div>
          {/* First block right side */}
          <div className="flex flex-col justify-between py-10 w-[41%]">
            <div className="flex flex-col rounded-2xl shadow-[inset_0_0_20px_rgba(0,0,0,0.7)] w-full h-[48%]">
              <div className="text-white p-3 text-4xl">Today's Attendance : </div>
              <div className="flex justify-end px-9 text-white text-right text-6xl">0/1</div>
            </div>
            <div className="rounded-2xl shadow-[inset_0_0_20px_rgba(0,0,0,0.7)] w-full h-[48%]">
              <div className="text-white p-3 text-4xl">Mark Attendance : </div>
              <div>
                <div className=" text-white text-2xl text-center m-5 p-3 rounded-2xl shadow-[inset_0_0_13px_rgba(255,255,255,0.7)]  hover:cursor-pointer hover:scale-105 duration-300" style={{backgroundColor:`${marked? "green" : "red" }`}} >
                  {marked? "Attendance Marked": "Mark Attendance" }
                </div>
              </div>
            </div>
          </div>
        </div>
      </article>
      {/* Second Block UI-Working BackendLogin-pending*/}
      <article
        key={2}
        className="rounded-4xl m-1 flex justify-around items-center flex-wrap gap-y-0 gap-x-1  h-[35vh] "
      >
        <div
          key={3}
          className="bg-[#ffffff20] border shadow-[inset_0_0_20px_rgba(0,0,0,0.7)] border-white rounded-4xl w-[73%] h-[28vh]"
        ></div>
        <div
          key={4}
          className="bg-[#ffffff20] border shadow-[inset_0_0_20px_rgba(0,0,0,0.7)] border-white rounded-4xl w-[24%] h-[28vh]"
        ></div>
      </article>
      {/* Third Block UI-Pending BackendLogin-pending*/}
      <article
        key={5}
        className="rounded-4xl flex justify-around items-center  m-1 "
      >
        <article
          key={6}
          className="rounded-4xl flex justify-around items-center flex-wrap m-2 w-[48%] p-3"
        >
          <div
            key={7}
            className="bg-[#ffffff20] border shadow-[inset_0_0_20px_rgba(0,0,0,0.7)]   border-white rounded-4xl m-1 w-[46%] h-[30vh]"
          ></div>
          <div
            key={8}
            className="bg-[#ffffff20] border shadow-[inset_0_0_20px_rgba(0,0,0,0.7)]   border-white rounded-4xl m-1 w-[46%] h-[30vh]"
          ></div>
          <div
            key={9}
            className="bg-[#ffffff20] border shadow-[inset_0_0_20px_rgba(0,0,0,0.7)]   border-white rounded-4xl m-1 w-[46%] h-[30vh]"
          ></div>
          <div
            key={10}
            className="bg-[#ffffff20] border shadow-[inset_0_0_20px_rgba(0,0,0,0.7)]   border-white rounded-4xl m-1 w-[46%] h-[30vh]"
          ></div>
        </article>
        <article
          key={11}
          className="rounded-4xl flex justify-around items-center flex-wrap m-2 w-[48%] p-3"
        >
          <div
            key={12}
            className="bg-[#ffffff20] border shadow-[inset_0_0_20px_rgba(0,0,0,0.7)]   border-white rounded-4xl m-1 w-[46%] h-[30vh]"
          ></div>
          <div
            key={13}
            className="bg-[#ffffff20] border shadow-[inset_0_0_20px_rgba(0,0,0,0.7)]   border-white rounded-4xl m-1 w-[46%] h-[30vh]"
          ></div>
          <div
            key={14}
            className="bg-[#ffffff20] border shadow-[inset_0_0_20px_rgba(0,0,0,0.7)]   border-white rounded-4xl m-1 w-[46%] h-[30vh]"
          ></div>
          <div
            key={15}
            className="bg-[#ffffff20] border shadow-[inset_0_0_20px_rgba(0,0,0,0.7)]   border-white rounded-4xl m-1 w-[46%] h-[30vh]"
          ></div>
        </article>
      </article>
    </section>
  );
};

export default Home;

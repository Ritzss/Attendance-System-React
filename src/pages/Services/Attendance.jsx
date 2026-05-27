import React from "react";
import { PiStarFourFill } from "react-icons/pi";
import AttendanceChart from "../../components/home/AttendanceChart";
import AttendancePie from "../../components/home/AttendancePie";

const Attendance = () => {
  //! HAVE TO MAKE IT RESPONSIVE

  return (
    <div>
      <div className=" AttendanceBlock bg-[#00246f89] rounded-2xl w-[98%] m-auto h-full">
        <div className="flex">
          <div className="flex text-7xl gap-13 text-white transfrom m-4">
            <div className="star text-sm self-end">
              <PiStarFourFill />
            </div>
            <div className="star text-xl self-start">
              <PiStarFourFill />
            </div>
            <div className="star text-2xl self-center">
              <PiStarFourFill />
            </div>
            <div className="star text-3xl self-end">
              <PiStarFourFill />
            </div>
            <div className="star text-4xl self-start">
              <PiStarFourFill />
            </div>
          </div>
          <div className="text-7xl m-4 font-extrabold">
            <span className="text-red-500 drop-shadow-md">A</span>
            <span className="text-green-500 drop-shadow-md">ttendance</span>
            <span className="text-red-500 drop-shadow-md">P</span>
            <span className="text-green-500 drop-shadow-md">age</span>
          </div>

          <div className="flex text-7xl gap-13 text-white transfrom m-4">
            <div className="star text-4xl self-start">
              <PiStarFourFill />
            </div>
            <div className="star text-3xl self-end">
              <PiStarFourFill />
            </div>
            <div className="star text-2xl self-center">
              <PiStarFourFill />
            </div>
            <div className="star text-xl self-start">
              <PiStarFourFill />
            </div>
            <div className="star text-sm self-end">
              <PiStarFourFill />
            </div>
          </div>
        </div>
      </div>
      <div className="m-auto">
        {/* SECOND BLOCK ui-done*/}
      <article className="SecondBlock rounded-4xl flex justify-evenly  ">
        <div id="chart" className=" border shadow-[inset_0_0_20px_rgba(0,0,0,0.7)] border-white rounded-4xl w-[75%] h-[28vh]">
          <AttendanceChart />
        </div>
        <div id="pie" className=" border shadow-[inset_0_0_20px_rgba(0,0,0,0.7)] border-white rounded-4xl">
          <AttendancePie />
        </div>
      </article>
      </div>
    </div>
  );
};

export default Attendance;

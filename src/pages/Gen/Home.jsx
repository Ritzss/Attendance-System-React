import React, { useContext } from "react";
import { ContextApi } from "../../context/ContextProvider";

import WelcomeCard from "../../components/home/WelcomeCard";
import MiniCard from "../../components/home/MiniCard";
import AttendanceChart from "../../components/home/AttendanceChart";
import AttendancePie from "../../components/home/AttendancePie";
//! HAVE TO MAKE IT RESPONSIVE

const Home = () => {
  const { currentUser, marked } = useContext(ContextApi);
  return (
    <section id="home" className=" HomeBlock ">
      {/* MAIN WELCOME + ATTENDANCE */}
      <article className="rounded-4xl m-5  flex ">
        <WelcomeCard data={{ ...currentUser, marked }} />
      </article>

      {/* SECOND BLOCK ui-done*/}
      <article className="SecondBlock rounded-4xl flex justify-evenly  ">
        <div id="chart" className=" border shadow-[inset_0_0_20px_rgba(0,0,0,0.7)] border-white rounded-4xl w-[75%] h-[28vh]">
          <AttendanceChart />
        </div>
        <div id="pie" className=" border shadow-[inset_0_0_20px_rgba(0,0,0,0.7)] border-white rounded-4xl">
          <AttendancePie />
        </div>
      </article>

      {/* THIRD BLOCK */}
      <article className="ThirdBlock rounded-4xl flex justify-evenly items-center m-2">
        {/* Left Grid */}
        <section className="LeftGrid rounded-4xl flex flex-wrap justify-center w-[48%] p-3">
          <MiniCard
            color="#2E70F0"
            title={"Leave Portal"}
            route={"/app/leaveportal"}
          />
          <MiniCard
            color="#1AAE51"
            title={"Attendance"}
            route={"/app/attendance"}
          />
        </section>

        {/* Right Grid */}
        <section className="RightGrid rounded-4xl flex  flex-wrap justify-center w-[48%] p-3">
          <MiniCard color="#0AA674" title={"Break Time"} route={"/app/break"} />
          <MiniCard color="#EF6110" title={"Holiday"} route={"/app/holiday"} />
        </section>
      </article>
    </section>
  );
};

export default Home;

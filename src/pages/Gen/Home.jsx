import React, { useContext } from "react";
import { ContextApi } from "../../context/ContextProvider";

import WelcomeCard from "../../components/home/WelcomeCard";
import MiniCard from "../../components/home/MiniCard";
import AttendanceChart from "../../components/home/AttendanceChart";
import AttendancePie from "../../components/home/AttendancePie";
//! HAVE TO MAKE IT RESPONSIVE

const Home = () => {
  const { currentUser, marked } = useContext(ContextApi);
  console.log(currentUser)


  

  return (
    <section id="home" className=" HomeBlock flex flex-col">
      {/* MAIN WELCOME + ATTENDANCE */}
      <article className="rounded-4xl m-5 flex justify-center items-center">
        <WelcomeCard data={{ ...currentUser, marked }} />
      </article>

      {/* SECOND BLOCK ui-done*/}
      <article className="rounded-4xl m-2 flex justify-around items-center gap-2 h-[35vh]">
        <div className=" border shadow-[inset_0_0_20px_rgba(0,0,0,0.7)] border-white rounded-4xl w-[73%] h-[28vh]">
          <AttendanceChart />
        </div>
        <div className=" border shadow-[inset_0_0_20px_rgba(0,0,0,0.7)] border-white rounded-4xl w-[24%] h-[28vh]">
          <AttendancePie />
        </div>
      </article>

      {/* THIRD BLOCK */}
      <article className="rounded-4xl flex justify-evenly items-center m-2">
        {/* Left Grid */}
        <section className="rounded-4xl flex flex-wrap justify-center w-[48%] p-3">
          <MiniCard
            color="#0097bd9f"
            title={"Leave Portal"}
            route={"/app/leaveportal"}
          />
          <MiniCard
            color="#ba01d39f"
            title={"Attendance"}
            route={"/app/attendance"}
          />
        </section>

        {/* Right Grid */}
        <section className="rounded-4xl flex  flex-wrap justify-center w-[48%] p-3">
          <MiniCard color="#fc7100" title={"Break Time"} route={"/app/break"} />
          <MiniCard color="#fc0000" title={"Holiday"} route={"/app/holiday"} />
        </section>
      </article>
    </section>
  );
};

export default Home;

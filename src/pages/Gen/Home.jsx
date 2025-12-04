import React, { useContext } from "react";
import { ContextApi } from "../../context/ContextProvider";

import WelcomeCard from "../../components/home/WelcomeCard";
import MiniCard from "../../components/home/MiniCard";
import AttendanceChart from "../../components/home/AttendanceChart";
import AttendancePie from "../../components/home/AttendancePie";

const Home = () => {
  const { data, marked } = useContext(ContextApi);

  return (
    <section className="flex flex-col gap-y-5">

      {/* MAIN WELCOME + ATTENDANCE */}
      <article className="rounded-4xl m-5 flex justify-center items-center">
        <WelcomeCard data={{ ...data, marked }} />
      </article>

      {/* SECOND BLOCK ui-done*/}
      <article className="rounded-4xl m-1 flex justify-around items-center gap-2 h-[35vh]">
        <div className=" border shadow-[inset_0_0_20px_rgba(0,0,0,0.7)] border-white rounded-4xl w-[73%] h-[28vh]">
          <AttendanceChart />
        </div>
        <div className=" border shadow-[inset_0_0_20px_rgba(0,0,0,0.7)] border-white rounded-4xl w-[24%] h-[28vh]">
          <AttendancePie />
        </div>
      </article>

      {/* THIRD BLOCK */}
      <article className="rounded-4xl flex justify-around items-center m-1">
        
        {/* Left Grid */}
        <section className="rounded-4xl flex flex-wrap justify-center w-[48%] p-3">
          <MiniCard />
          <MiniCard />
          <MiniCard />
          <MiniCard />
        </section>

        {/* Right Grid */}
        <section className="rounded-4xl flex flex-wrap justify-center w-[48%] p-3">
          <MiniCard />
          <MiniCard />
          <MiniCard />
          <MiniCard />
        </section>

      </article>

    </section>
  );
};

export default Home;

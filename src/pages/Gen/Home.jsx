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
      <article className="h-full rounded-4xl m-5 ">
        <WelcomeCard data={{ ...currentUser, marked }} />
      </article>

      {/* THIRD BLOCK */}
      <article className="ThirdBlock rounded-4xl flex justify-evenly items-center m-2">
        {/* Left Grid */}
        <section className="LeftGrid rounded-4xl flex justify-center w-full p-3">
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

       
      </article>
    </section>
  );
};

export default Home;

import React from 'react'
import Logimg from "../../Assets/Images/navlogo.png";

const AuthLogo = ({id,className}) => {
  return (
    <section
      id={ id || "rightsideLogin"}
      className={className ? className : "blue-metal flex flex-col justify-center items-center rounded-2xl border-l-0 rounded-r-none gap-4  w-[75vh] p-5 h-[75vh]"
       }
    >
      <header>
        <img src={Logimg} alt="logo.png" />
      </header>
      <main className="text-center">
        <div className="text-lg text-white">
          <p className="font-semibold text-2xl">About Us:</p>
          <b>ADS247365</b> is a global business solutions company focused on
          delivering reliable, scalable, and cost-efficient services — 24 hours
          a day, 7 days a week, 365 days a year (hence the name!). The brand is
          built around consistency, excellence, and round-the-clock support.
        </div>
      </main>
      <footer className="">
        <div className=" flex justify-center  items-center w-full h-[30%] text-center text-sm text-white">
          © 2019–{new Date().getFullYear()} ADS247365 INC. All rights reserved.
        </div>
      </footer>
    </section>
  );
}

export default AuthLogo
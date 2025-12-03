import React from "react";
import FuzzyText from "../components/UI/FuzzyText";
import { NavLink } from "react-router";

const Error = () => {
  return (
    <div className="flex flex-col gap-6 justify-center items-center mt-[11vh]">
      <div className="self-center flex justify-center items-center staticbg shadow-[inset_0_0_50px_rgba(0,0,0)] rounded-4xl h-[70vh] w-[70vw] overflow-hidden">
        {/* FOREGROUND CONTENT (transparent to mouse) */}
        <div
          className=" h-full w-full flex flex-col 
                      justify-center items-center"
        >
          <FuzzyText
            baseIntensity={0.2}
            hoverIntensity={0.5}
            enableHover={true}
          >
            404
          </FuzzyText>

          <div className="mt-10">
            <FuzzyText
              baseIntensity={0.2}
              hoverIntensity={0.5}
              enableHover={true}
            >
              Not Found
            </FuzzyText>
          </div>
        </div>
      </div>
      <NavLink to={"/"}>
        <div className="ml-[50vw] return-knob">
          <div className="knob-indicator"></div>
        </div>
      </NavLink>
      <div className="relative -top-[13.1vh] left-[23.6vw] ">
        <div className="mt-5 absolute -z-10 top-1 text-sm text-white" to={"/"}>
          {" "}
          Return{" "}
        </div>
      </div>
    </div>
  );
};

export default Error;

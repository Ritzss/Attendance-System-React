import React from "react";
import FuzzyText from "../../components/UI/FuzzyText";
import { NavLink, useRouteError, isRouteErrorResponse } from "react-router";

const Error = () => {
  const error = useRouteError();

  console.log("ROUTER ERROR:", error);

  // ----- Extract the real error info -----
  let title = "Unexpected Error";
  let message = "Something went wrong.";

  // If error comes from router loader/action
  if (isRouteErrorResponse(error)) {
    title = `${error.status} - ${error.statusText}`;
    message = error.data || "Unknown router error.";
  }
  // If developer threw: throw new Error("msg")
  else if (error instanceof Error) {
    title = "Application Error";
    message = error.message;
  }
  // If weird case
  else if (typeof error === "string") {
    message = error;
  }

  return (
    <div className="flex flex-col gap-6 justify-center items-center mt-[10vh]">
      <div className="self-center flex justify-center items-center staticbg shadow-[inset_0_0_50px_rgba(0,0,0)] rounded-4xl h-[70vh] w-[70vw] overflow-hidden">
        {/* CONTENT */}
        <div className="h-full w-full flex flex-col justify-center items-center">
          {/* Title */}
          <FuzzyText
            baseIntensity={0.2}
            hoverIntensity={0.5}
            enableHover={true}
          >
            {title}
          </FuzzyText>

          {/* Message */}
          <div className="mt-10">
            <FuzzyText
              baseIntensity={0.2}
              hoverIntensity={0.5}
              enableHover={true}
            >
              {message}
            </FuzzyText>
          </div>
        </div>
      </div>

      {/* Return Button */}
      <NavLink to={"/"}>
        <div className="ml-[50vw] return-knob">
          <div className="knob-indicator"></div>
        </div>
      </NavLink>

      <div className="relative -top-[18vh] text-center left-[23vw] ">
        <div className="mt-5 absolute -z-10 top-1 text-lg font-bold text-white">
          Rewind Signal
        </div>
      </div>
    </div>
  );
};

export default Error;

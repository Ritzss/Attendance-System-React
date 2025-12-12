import React from "react";
import FuzzyText from "../../components/UI/FuzzyText";
import { NavLink, useRouteError, isRouteErrorResponse } from "react-router";
//! HAVE TO MAKE IT RESPONSIVE

const Error = () => {
  const error = useRouteError();

  console.log("ROUTER ERROR:", error);

  let title = "Unexpected Error";
  let message = "Something went wrong.";
  let code = "N/A";

  try {
    // Case 1: Router response error
    if (isRouteErrorResponse(error)) {
      code = error.status || "N/A";
      title = error.statusText || "Router Error";
      message = error.data || "Unknown router error.";
    }

    // Case 2: Regular JS error (but check safely!)
    else if (error && typeof error === "object" && "message" in error) {
      code = error.code || "APP";
      title = error.name || "Application Error";
      message = error.message || "Unknown application error.";
    }

    // Case 3: String thrown
    else if (typeof error === "string") {
      code = "STRING";
      title = "Error";
      message = error;
    }

    // Case 4: Nothing provided
    else if (!error) {
      code = "NO-ERROR";
      message = "No error details available.";
    }

    // Case 5: Weird object
    else {
      code = error.code || "UNKNOWN";
      title = error.title || "Unknown Error";
      message =
        error.message ||
        JSON.stringify(error, null, 2) ||
        "No message available.";
    }
  } catch (e) {
    // Prevent Error page from breaking
    title = "Rendering Error";
    message = e.message;
    code = "ERROR-PAGE-FAIL";
  }

  return (
    <div className="ErrorBlock flex flex-col gap-6 justify-center items-center mt-[10vh]">
      <div className="self-center flex justify-center items-center staticbg shadow-[inset_0_0_50px_rgba(0,0,0)] rounded-4xl h-[70vh] w-[70vw] overflow-hidden">

        <div className="h-full w-full  flex flex-col justify-center items-center">

          <FuzzyText baseIntensity={0.2} hoverIntensity={0.5} enableHover={true}>
            Error Code: {code}
          </FuzzyText>

          <div className="mt-7">
            <FuzzyText baseIntensity={0.2} hoverIntensity={0.5} enableHover={true}>
              {title}
            </FuzzyText>
          </div>

          <div className="mt-10 text-center">
            <FuzzyText baseIntensity={0.2} hoverIntensity={0.5} enableHover={true}>
              {message}
            </FuzzyText>
          </div>

        </div>
      </div>

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

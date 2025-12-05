import React from "react";

const MinicardLogin = ({ name, type, radioOptions = [] }) => {
  return (
    <article className=" rounded-4xl mx- m-2 ">
      <header className="p-1 pl-7 h-full text-xl">
        <header 
            style={{display:type==="radio"? "flex" : " block",
              gap:type==="radio" ? "40px" : "0px"
            }}
        className="">
          <header>
            <label
             className="text-2xl" htmlFor={name}>
              {name || "Username :"}
            </label>
          </header>
          <main className="flex justify-center ">
            {type === "radio" ? (
              <div className="flex gap-8 w-full justify-center">
                {radioOptions.length > 0 &&
                  radioOptions.map((options) => {
                    return (
                      <div className="flex gap-1">
                        <input
                          className=""
                          type={type}
                          id={options.value}
                          name={name}
                          value={options.value}
                        />
                        <label className="" htmlFor={options.value}>
                          {options.label}
                        </label>
                      </div>
                    );
                  })}
              </div>
            ) : (
              <div className=" flex flex-col justify-center items-center bg-[#ffffff] rounded w-[90%] ">
                <input
                  id={name}
                  type={type || "text"}
                  className="rounded-xl caret-transparent text-md w-[80%] outline-0 bg-[#ffffff96]"
                />
              </div>
            )}
          </main>
        </header>
      </header>
    </article>
  );
};

export default MinicardLogin;

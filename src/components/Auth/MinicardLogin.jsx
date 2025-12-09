import React from "react";

const MinicardLogin = ({
  label,
  name,
  value,
  type,
  width,
  paddingL,
  height,
  autocomplete,
  divwidth,
  textarea = false,
  onChange,
  radioOptions = [],
}) => {
  const handelTextArea = (e) => {
    onChange(e);

    e.target.style.height = "4vh";
    e.target.style.height = e.target.scrollHeight + "px";
  };

  return (
    <article className=" rounded-4xl mx- m-2 ">
      <article className="p-1 pl-7 h-full text-xl">
        <article
          style={{
            display: type === "radio" ? "flex" : " block",
            gap: type === "radio" ? "40px" : "0px",
          }}
          className=""
        >
          <header>
            <label className="text-2xl" htmlFor={name}>
              {label || name}
            </label>
          </header>
          <main className="flex justify-center ">
            {type === "radio" ? (
              <div className="flex gap-6 w-full justify-center">
                {radioOptions.length > 0 &&
                  radioOptions.map((options) => {
                    return (
                      <div
                        style={{
                          width: divwidth || "",
                          height: height || "",
                        }}
                        className="flex gap-1"
                      >
                        <input
                          style={{
                            width: width || "",
                            height: height || "",
                          }}
                          className=""
                          type={type}
                          id={options.value}
                          name={name}
                          value={options.value}
                          checked={value === options.value}
                          onChange={onChange}
                        />
                        <label className="" htmlFor={options.value}>
                          {options.label}
                        </label>
                      </div>
                    );
                  })}
              </div>
            ) : (
              <div
                style={{
                  width: divwidth || "",
                  height: height || "",
                }}
                className="flex flex-col justify-center items-center bg-[#ffffff] rounded w-[90%] "
              >
                {textarea ? (
                  <textarea
                    style={{
                      paddingLeft: paddingL || "30px",
                      width: width || "4vh",
                      height:"4vh",
                      maxHeight:"7vh",
                    }}
                    id={name}
                    name={name}
                    value={value}
                    onChange={handelTextArea}
                    placeholder={name}
                    className="rounded-r-xl caret-transparent text-md w-[80%] h-24 outline-0 bg-[#ffffff96]"
                  ></textarea>
                ) : (
                  <input
                    style={{
                      paddingLeft: paddingL || "30px",
                      width: width || "",
                    }}
                    id={name}
                    name={name}
                    value={value}
                    onChange={onChange}
                    placeholder={name}
                    autoComplete={autocomplete || "off"}
                    type={type || "text"}
                    className="rounded-r-xl caret-transparent text-md w-[80%] outline-0 bg-[#ffffff96]"
                  />
                )}
              </div>
            )}
          </main>
        </article>
      </article>
    </article>
  );
};

export default MinicardLogin;

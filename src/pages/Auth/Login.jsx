import React from "react";
import MinicardLogin from "../../components/Auth/MinicardLogin";
import { useContext } from "react";
import { ContextApi } from "../../context/ContextProvider";
import { MdOutlineMail, MdOutlinePassword } from "react-icons/md";
import { RiEyeCloseFill, RiEyeFill } from "react-icons/ri";
import { NavLink } from "react-router";
import Logimg from "../../Assets/Images/navlogo.png";
import Navbar from "../../components/Navbar/Navbar";
import ClickSpark from "../../components/UI/ClickSpark";

const Login = () => {
  let { data, visible, setVisible, navTo, setNavTo } = useContext(ContextApi);
  let handleLogin = () => {
    if (data) {
      setNavTo("app/home");
    }
  };

  return (
    <ClickSpark
      sparkColor="#fff"
      sparkSize={10}
      sparkRadius={20}
      sparkCount={10}
      duration={200}
    >
      <section>
        <Navbar />
        <section
          id="login-box"
          className=" bg-[#00000041] mx-[10%] my-[5%] rounded-2xl customshadow p-3 flex justify-center items-center"
        >
          <section
            id="rightsideLogin"
            className=" blue-metal flex flex-col justify-center items-center rounded-2xl border-l-0 rounded-r-none gap-4  w-[75vh] p-5 h-[75vh]"
          >
            <header>
              <img src={Logimg} alt="logo.png" />
            </header>
            <main className="text-center">
              <p className="text-lg text-white">
                <p className="font-semibold text-2xl">About Us:</p>
                <b>ADS247365</b> is a global business solutions company focused
                on delivering reliable, scalable, and cost-efficient services —
                24 hours a day, 7 days a week, 365 days a year (hence the
                name!). The brand is built around consistency, excellence, and
                round-the-clock support.
              </p>
            </main>
            <footer className="">
              <div className=" flex justify-center  items-center w-full h-[30%] text-center text-sm text-white">
                © 2019–{new Date().getFullYear()} ADS247365 INC. All rights
                reserved.
              </div>
            </footer>
          </section>
          <section
            id="leftsideLogin"
            className="blue-metal flex flex-col rounded-2xl border-r-0 rounded-l-none gap-4 w-[75vh] p-5 h-[75vh]"
          >
            <header id="heading" className=" flex justify-center items-center">
              <div className="text-4xl text-[#3b3b3bcb] p-3 pt-1 bg-[#ffffff99] shadow-[inset_0_0_20px_5px_rgba(1,129,189)] w-[45%] text-center rounded-3xl">
                <p>Login</p>
              </div>
            </header>
            <main id="inputs" className=" flex flex-col justify-center h-[55%]">
              <header id="email" className=" relative">
                <div className="absolute bottom-[1.4vh] flex justify-center items-center w-[2.9vw] text-[26px] h-[4vh] bg-[#9eff80] border rounded-l-md left-[3.9vw]">
                  <MdOutlineMail />
                </div>
                <MinicardLogin name={"Email :"} />
              </header>
              <main id="password" className=" relative">
                <div className="absolute bottom-[1.4vh] flex justify-center items-center w-[2.9vw] text-[26px] h-[4vh] bg-[#9eff80] border rounded-l-md left-[3.9vw]">
                  <MdOutlinePassword />
                </div>
                <MinicardLogin
                  name={"Password :"}
                  type={visible ? "text" : "password"}
                />
                <div
                  className="absolute bottom-[1.4vh] h-[4vh] flex justify-center items-center text-xl bg-[#9eff80] w-7.5 border rounded-r-md right-[2.4vw]"
                  onClick={() => setVisible(!visible)}
                >
                  {visible ? <RiEyeFill /> : <RiEyeCloseFill />}
                </div>
              </main>
              <footer id="role">
                <MinicardLogin
                  name={"Role :"}
                  type={"radio"}
                  radioOptions={[
                    {
                      value: "admin",
                      label: "Admin",
                    },
                    {
                      value: "employee",
                      label: "Employee",
                    },
                  ]}
                />
              </footer>
            </main>
            <footer
              id="buttons"
              className="flex justify-between flex-col h-[25%]"
            >
              <header className="flex justify-center gap-2 items-center w-full h-full">
                <NavLink
                  to={navTo}
                  className=" w-[48%] text-center h-[48%] bg-[#ffffff99] rounded-xl flex justify-center shadow-[inset_0_0_20px_3px_rgba(0,255,0)] hover:shadow-[inset_0_0_0] hover:bg-[#00ff00] transition-colors duration-2000"
                >
                  <div className="flex justify-center items-center">
                    <button onClick={handleLogin()}>Login</button>
                  </div>
                </NavLink>
                <div className=" w-[48%] text-center h-[48%] bg-[#ffffff99] rounded-xl flex justify-center shadow-[inset_0_0_20px_3px_rgba(255,0,0)] hover:shadow-[inset_0_0_0] hover:bg-[#ff0000] transition-colors duration-2000">
                  <button className="">Forgot Password</button>
                </div>
              </header>
              <footer className="flex flex-col h-[5%]">
                <div className="flex">
                  <p className="flex self-end text-white">
                    Didn't join our family yet?{" "}
                    <NavLink to={"register"}>
                      <p className="pl-1 text-red-600 hover:text-[#ff9100] transition-transform duration-300 hover:scale-110 ">
                        Register...
                      </p>{" "}
                    </NavLink>
                  </p>
                </div>
              </footer>
            </footer>
          </section>
        </section>
      </section>
    </ClickSpark>
  );
};

export default Login;

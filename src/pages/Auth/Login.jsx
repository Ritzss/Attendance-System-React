import React, { useContext } from "react";
import MinicardLogin from "../../components/Auth/MinicardLogin";
import { ContextApi } from "../../context/ContextProvider";
import { MdOutlineMail, MdOutlinePassword } from "react-icons/md";
import { RiEyeCloseFill, RiEyeFill } from "react-icons/ri";
import { NavLink, useNavigate } from "react-router";
import Navbar from "../../components/Navbar/Navbar";
import ClickSpark from "../../components/UI/ClickSpark";
import AuthLogo from "../../components/Auth/AuthLogo";
import Authbuttons from "../../components/Auth/Authbuttons";
import { Toaster } from "react-hot-toast";
import toast from "react-hot-toast";

const Login = () => {
  const { data, loginForm, setLoginForm, visible, setVisible,loginInit,setCurrentUser, setLoggin, setAuthUser, } =
    useContext(ContextApi);
  let navigate = useNavigate();

  // ✔ input change handler
  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ✔ login handler
  const handleLogin = (e) => {
    e.preventDefault();
    if (!loginForm.Email || !loginForm.Password || !loginForm.Role) {
      return toast.error("Please fill all fields");
    }

    const user = data.find((u) => u.Email === loginForm.Email);
    console.log(user.Name);
    
    setCurrentUser(user);

    if (!user) {
      return toast.error("User not found!");
    }

    if (user.Password !== loginForm.Password) {
      return toast.error("Incorrect password!");
    }

    if (user.Role !== loginForm.Role) {
      return toast.error("Role mismatch!");
    }

    if(user.Role === "admin"){
      setAuthUser("admin")
      setLoggin(true);
    }else if(user.Role === "employee"){
      setAuthUser("employee")
      setLoggin(true);
    }
    
    toast.success("Login Successful!");

    // Navigate after success
    setLoginForm(loginInit)
    navigate("/app/home")

  };

  return (
    <ClickSpark
      sparkColor="#fff"
      sparkSize={10}
      sparkRadius={20}
      sparkCount={10}
      duration={200}
    >
      <Toaster />
      <section>
        <Navbar />

        <section
          id="login-box"
          className="bg-[#00000041] mx-[10%] my-[5%] rounded-2xl customshadow p-3 flex justify-center items-center"
        >
          <AuthLogo />

          <section
            id="leftsideLogin"
            className="blue-metal flex flex-col rounded-2xl border-r-0 rounded-l-none gap-4 w-[75vh] p-5 h-[75vh]"
          >
            {/* ===== Heading ===== */}
            <header className="flex justify-center items-center">
              <div className="text-4xl text-[#3b3b3bcb] p-3 pt-1 bg-[#ffffff99] shadow-[inset_0_0_20px_5px_rgba(1,129,189)] w-[45%] text-center rounded-3xl">
                <p>Login</p>
              </div>
            </header>

            {/* ===== Inputs ===== */}
            <main id="inputs" className="flex flex-col justify-center h-[55%]">

              {/* Email */}
              <header className="relative">
                <div className="absolute bottom-[1.4vh] flex justify-center items-center w-[2.9vw] text-[26px] h-[4vh] bg-[#9eff80] rounded-l-md left-[3.9vw]">
                  <MdOutlineMail />
                </div>

                <MinicardLogin
                  label="Email :"
                  type="email"
                  name="Email"
                  value={loginForm.Email}
                  onChange={handleChange}
                  paddingL="40px"
                  width={"100%"}
                />
              </header>

              {/* Password */}
              <main id="password" className="relative">
                <div className="absolute bottom-[1.4vh] flex justify-center items-center w-[2.9vw] text-[26px] h-[4vh] bg-[#9eff80] rounded-l-md left-[3.9vw]">
                  <MdOutlinePassword />
                </div>

                <MinicardLogin
                  label="Password :"
                  name="Password"
                  type={visible ? "text" : "password"}
                  value={loginForm.Password}
                  onChange={handleChange}
                  paddingL="0px"
                />

                {/* Password Visibility Toggle */}
                <div
                  className="absolute bottom-[1.4vh] h-[4vh] flex justify-center items-center text-xl bg-[#9eff80] w-7.5 rounded-r-md right-[2.4vw]"
                  onClick={() => setVisible(!visible)}
                >
                  {visible ? <RiEyeFill /> : <RiEyeCloseFill />}
                </div>
              </main>

              {/* Role */}
              <footer id="role">
                <MinicardLogin
                  label="Role :"
                  name="Role"
                  value={loginForm.Role}
                  onChange={handleChange}
                  type="radio"
                  width="100%"
                  radioOptions={[
                    { value: "admin", label: "Admin" },
                    { value: "employee", label: "Employee" },
                  ]}
                />
              </footer>
            </main>

            {/* ===== Buttons ===== */}
            <footer id="buttons" className="flex justify-between flex-col h-[25%]">
              <Authbuttons handleLogin={handleLogin} />

              {/* Bottom links */}
              <footer className="flex flex-col h-[5%]">
                <div className="flex justify-between">
                  {/* Register */}
                  <div className="flex self-end text-white">
                    Didn't join our family yet?
                    <NavLink to={"register"}>
                      <p className="pl-1 text-red-600 hover:text-[#ff9100] transition-transform duration-300 hover:scale-110">
                        Register...
                      </p>
                    </NavLink>
                  </div>

                  {/* Forgot Password */}
                  <div className="flex text-white">
                    <NavLink to={"forgot_password"}>
                      <p className="pl-1 text-red-600 hover:text-[#ff9100] transition-transform duration-300 hover:scale-110">
                        Forgot Password?
                      </p>
                    </NavLink>
                  </div>
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

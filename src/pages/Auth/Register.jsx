import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import MinicardLogin from "../../components/Auth/MinicardLogin";
import { useContext } from "react";
import { ContextApi } from "../../context/ContextProvider";
import AuthLogo from "../../components/Auth/AuthLogo";
import { NavLink, useNavigate } from "react-router-dom";
import ClickSpark from "../../components/UI/ClickSpark";
import toast from "react-hot-toast";
import { Toaster } from "react-hot-toast";
import {
  MdOutlineDriveFileRenameOutline,
  MdOutlineMail,
  MdOutlinePassword,
} from "react-icons/md";
import { IoMdContact } from "react-icons/io";
import { GiOfficeChair } from "react-icons/gi";
import { FaAddressCard, FaUserTie } from "react-icons/fa";
import { RiEyeCloseFill, RiEyeFill } from "react-icons/ri";
import bcrypt from "bcryptjs";
//! HAVE TO MAKE IT RESPONSIVE

const Register = () => {
  let {
    initRegistration,
    data,
    registerForm,
    setRegisterForm,
    setVisible,
    visible,
    visible2,
    setVisible2,
    RegisterUser,
  } = useContext(ContextApi);
  let navigate = useNavigate();

  let handleChange = (e) => {
    let { name, value, type } = e.target;

    if (type === "tel") {
      value = value.replace(/\D/g, ""); // keep only digits
    }

    setRegisterForm((prev) => {
      const newForm = { ...prev, [name]: value };

      // ---- CHECK MATCH AFTER STATE IS UPDATED ----
      if (name === "Confirm_Name") {
        if (value === prev.Name) {
          toast.success("Names match");
          setRegisterForm({ ...prev, [name]: value });
        } else {
          toast.error("Names don't match");
        }
      }

      if (name === "Confirm_Password") {
        if (value === prev.Password) {
          toast.success("Password Match");
          setRegisterForm({ ...prev, [name]: value });
        } else {
          toast.error("Password don't match");
        }
      }
      if (name === "Email") {
        console.log(value);
        console.log(data);

        data.map((ele) => {
          if (value !== ele.Email) {
            setRegisterForm({ ...prev, [name]: value });
          } else {
            setRegisterForm({ ...prev, [name]: "" });
            toast.error("Email Exists");
          }
        });
      }

      return newForm;
    });
  };
  let handleRegister = async (e) => {
  e.preventDefault();

  console.log(registerForm);

  const {
    Name,
    Confirm_Name,
    Email,
    Password,
    Confirm_Password,
    ...rest
  } = registerForm;

  // Empty check
  const isEmpty = Object.values(registerForm).some((val) => val.trim() === "");
  if (isEmpty) {
    toast.error("Please fill all details");
    return;
  }

  // Name match check
  if (Name !== Confirm_Name) {
    toast.error("Name and confirm name do not match");
    return;
  }

  // Password match check
  if (Password !== Confirm_Password) {
    toast.error("Password and confirm password do not match");
    return;
  }

  // 🔒 SECURE: Hash password before sending
  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync(Password, salt);

  const payload = {
    ...rest,
    Name,
    Email:Email.trim().toLowerCase(),
    password: hashedPassword, // encrypted
  };

  try {
    await RegisterUser(payload); // send hashed pass
    toast.success("Registration Successful!");
    navigate("/");
    setRegisterForm(initRegistration);
  } catch (err) {
    toast.error(err.message);
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
      <Toaster />
      <section key={10} className="RegisterBlock flex flex-col justify-center items-center">
        <Navbar />
        <section
          key={9}
          id="registration-box"
          className=" bg-[#00000041] w-[99%] rounded-2xl customshadow my-5 flex justify-center items-center"
        >
          <section
            key={11}
            className="registerBlock blue-metal h-[90%] p-5 flex justify-between my-5 rounded-2xl customshadow w-[98%]"
          >
            <section id="rightsideRegister" className="w-[140%] flex  ">
              <AuthLogo
              id={"rightsideRegister"}
                className={"bg-transparent flex flex-col justify-center gap-10 items-center "}
              />
            </section>
            <div className="h-full flex justify-between flex-col">
              <header
                id="heading"
                className=" flex justify-center items-center"
              >
                <div className="text-4xl text-[#3b3b3bcb] p-3 pt-1  bg-[#ffffff99] shadow-[inset_0_0_20px_5px_rgba(1,129,189)] text-center rounded-3xl">
                  <p>Register</p>
                </div>
              </header>
              <form 
                id="leftsideRegistration"
                method="POST"
                autoComplete="off"
                className="flex flex-col justify-evenly items-center"
              >
                <div className="flex flex-wrap justify-center">
                  <div key={"name_attribute"} className="relative">
                    <div className="regis-icons absolute top-[5.87vh] left-[1.5vw] text-xl flex justify-center items-center rounded-l-md bg-[#9eff80] h-[3.8vh] w-[3vw]">
                      <MdOutlineDriveFileRenameOutline />
                    </div>
                    <MinicardLogin
                      key={0}
                      label={"Name :"}
                      name={"Name"}
                      value={registerForm.Name}
                      onChange={handleChange}
                      divwidth={"40vh"}
                      width={"100%"}
                    />
                  </div>
                  <div key={"Confirmname_attribute"} className="relative">
                    <div className="regis-icons absolute top-[5.87vh] left-[1.5vw] text-xl flex justify-center items-center rounded-l-md bg-[#9eff80] h-[3.8vh] w-[3vw]">
                      <MdOutlineDriveFileRenameOutline />
                    </div>
                    <MinicardLogin
                      label={"Confirm Name :"}
                      key={1}
                      name={"Confirm_Name"}
                      value={registerForm.Confirm_Name}
                      onChange={handleChange}
                      divwidth={"40vh"}
                      width={"100%"}
                    />
                  </div>
                  <div className="relative">
                    <div className="regis-icons absolute top-[5.87vh] left-[1.5vw] text-xl flex justify-center items-center rounded-l-md bg-[#9eff80] h-[3.8vh] w-[3vw]">
                      <MdOutlineMail />
                    </div>
                    <MinicardLogin
                      key={3}
                      label={"Email :"}
                      type={"email"}
                      name={"Email"}
                      value={registerForm.Email}
                      onChange={handleChange}
                      divwidth={"40vh"}
                      width={"100%"}
                    />
                  </div>
                  <div className="relative">
                    <div className="regis-icons absolute top-[5.87vh] left-[1.5vw] text-xl flex justify-center items-center rounded-l-md bg-[#9eff80] h-[3.8vh] w-[3vw]">
                      <IoMdContact />
                    </div>
                    <MinicardLogin
                      key={2}
                      label={"Contact :"}
                      name={"Contact"}
                      value={registerForm.Contact}
                      type={"tel"}
                      onChange={handleChange}
                      divwidth={"40vh"}
                      width={"100%"}
                    />
                  </div>
                  <div className="relative">
                    <div className="regis-icons absolute top-[5.87vh] left-[1.5vw] text-xl flex justify-center items-center rounded-l-md bg-[#9eff80] h-[3.8vh] w-[3vw]">
                      <GiOfficeChair />
                    </div>
                    <MinicardLogin
                      key={4}
                      label={"Department :"}
                      name={"Department"}
                      value={registerForm.Department}
                      onChange={handleChange}
                      divwidth={"40vh"}
                      width={"100%"}
                    />
                  </div>
                  <div className="relative">
                    <div className="regis-icons absolute top-[5.87vh] left-[1.5vw] text-xl flex justify-center items-center rounded-l-md bg-[#9eff80] h-[3.8vh] w-[3vw]">
                      <FaUserTie />
                    </div>
                    <MinicardLogin
                      key={5}
                      label={"Designation :"}
                      name={"Designation"}
                      value={registerForm.Designation}
                      onChange={handleChange}
                      divwidth={"40vh"}
                      width={"100%"}
                    />
                  </div>
                  <div className="relative">
                    <MinicardLogin
                      top-2
                      key={6}
                      label={"Role :"}
                      name={"Role"}
                      value={registerForm.Role}
                      onChange={handleChange}
                      type={"radio"}
                      width={"100%"}
                      radioOptions={[
                        { value: "admin", label: "Admin" },
                        { value: "employee", label: "Employee" },
                      ]}
                    />
                  </div>
                  <div name="AddressDiv" className="relative">
                    <div className="regis-icons2 absolute top-[5.9vh] text-xl left-[1.5vw] flex justify-center items-center rounded-l-md bg-[#9eff80] h-[4vh] w-[3vw]">
                      <FaAddressCard />
                    </div>
                    <MinicardLogin
                      key={13}
                      label={"Address:"}
                      name={"Address"}
                      value={registerForm.Address}
                      onChange={handleChange}
                      textarea={true}
                      // height={"4vh"}
                      divwidth={"40vh"}
                      width={"100%"}
                    />
                  </div>
                  <div className="relative">
                    <div className="regis-icons1 absolute top-[5.87vh] text-xl left-[1.5vw] flex justify-center items-center rounded-l-md bg-[#9eff80] h-[3.8vh] w-[3vw]">
                      <MdOutlinePassword />
                    </div>

                    <MinicardLogin
                      key={8}
                      label={"Password :"}
                      name={"Password"}
                      type={visible ? "text" : "password"}
                      value={registerForm.Password}
                      paddingL={"0px"}
                      onChange={handleChange}
                      divwidth={"40vh"}
                      width={"80%"}
                      autocomplete={"new-password"}
                    />
                    <div
                      className="regis-icons1 absolute top-[5.87vh] text-xl right-[0.7vw] flex justify-center items-center rounded-r-md bg-[#9eff80] h-[3.8vh] w-[2.6vw]"
                      onClick={() => {
                        setVisible(!visible);
                      }}
                    >
                      {visible ? <RiEyeFill /> : <RiEyeCloseFill />}
                    </div>
                  </div>
                  <div className="relative">
                    <div className="regis-icons1 absolute text-xl top-[5.87vh] left-[1.5vw] flex justify-center items-center rounded-l-md bg-[#9eff80] h-[3.8vh] w-[3vw]">
                      <MdOutlinePassword />
                    </div>
                    <MinicardLogin
                      key={8}
                      label={"Confirm Password :"}
                      name={"Confirm_Password"}
                      type={visible2 ? "text" : "password"}
                      value={registerForm.Confirm_Password}
                      paddingL={"0px"}
                      onChange={handleChange}
                      divwidth={"40vh"}
                      width={"80%"}
                      autocomplete={"new-password"}
                    />
                    <div
                      className="regis-icons1 absolute top-[5.87vh] text-xl right-[0.7vw] flex justify-center items-center rounded-r-md bg-[#9eff80] h-[3.8vh] w-[2.6vw]"
                      onClick={() => {
                        setVisible2(!visible2);
                      }}
                    >
                      {visible2 ? <RiEyeFill /> : <RiEyeCloseFill />}
                    </div>
                  </div>
                </div>
                <section className="flex-col flex w-full">
                  <header className="flex justify-center items-center">
                    <button
                      disabled={Object.values(registerForm).some((v) => v === "")}
                      onClick={handleRegister}
                      className="w-[35%] h-[6vh] text-2xl text-center bg-[#ffffff99] rounded-xl flex justify-center items-center shadow-[inset_0_0_20px_3px_rgba(0,255,0)] hover:shadow-[inset_0_0_0] hover:bg-[#00ff00] transition-colors duration-300"
                    >
                      Register
                    </button>
                  </header>
                  <footer className="p-1 self-end">
                    <div className="text-white">
                      <div className="flex">
                        Already member of our family?{" "}
                        <NavLink to={"/"}>
                          <div className="pl-1 text-red-600 hover:text-[#ff9100] hover:scale-120 transition-transform duration-300 ">
                            Login
                          </div>
                        </NavLink>{" "}
                      </div>
                    </div>
                  </footer>
                </section>
              </form>
            </div>
          </section>
        </section>
      </section>
    </ClickSpark>
  );
};

export default Register;

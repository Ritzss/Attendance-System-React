import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import MinicardLogin from "../../components/Auth/MinicardLogin";
import { useContext } from "react";
import { ContextApi } from "../../context/ContextProvider";
import AuthLogo from "../../components/Auth/AuthLogo";
import Authbuttons from "../../components/Auth/Authbuttons";
import { NavLink, useNavigate } from "react-router";
import ClickSpark from "../../components/UI/ClickSpark";
import toast from "react-hot-toast";
import { Toaster } from "react-hot-toast";

const Register = () => {
  let { initRegistration, form, setForm } = useContext(ContextApi);
  let navigate = useNavigate();

  let handleChange = (e) => {
    let { name, value, type } = e.target;

    if (type === "tel") {
      value = value.replace(/\D/g, ""); // keep only digits
    }
    setForm((prev) => {
      const newForm = { ...prev, [name]: value };

      // ---- CHECK MATCH AFTER STATE IS UPDATED ----
      if (name === "Confirm_Name") {
        if (value === prev.Name) {
          toast.success("Names match");
          setForm({...prev,[name]:value});
          console.log(form,[name],value);
          
        } else {
          toast.error("Names don't match");
        }
      }

      return newForm;
    });
  };
  let handleRegister = (e) => {
    e.preventDefault();

    if(form.Name !== form.Confirm_Name){
      toast.error("Bhai yha to sahi daal info")
      return;
    }else{
      
    }

    // navigate("/");
    setForm(initRegistration);
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
      <section key={10} className="flex flex-col justify-center items-center">
        <Navbar />
        <section
          key={9}
          id="registration-box"
          className=" bg-[#00000041] w-[95%] rounded-2xl customshadow my-5 flex justify-center items-center"
        >
          <section
            key={11}
            className="blue-metal h-[80vh] p-5 flex  justify-evenly my-5 rounded-2xl customshadow w-[98%]"
          >
            <section id="rightsideRegister" className="w-[200%] flex  ">
              <AuthLogo
                className={" flex flex-col justify-evenly items-center w-[%]"}
              />
            </section>
            <div className="h-full flex justify-between flex-col">
              <header
                id="heading"
                className=" flex justify-center items-center"
              >
                <div className="text-4xl text-[#3b3b3bcb] p-3 pt-1 bg-[#ffffff99] shadow-[inset_0_0_20px_5px_rgba(1,129,189)] w-[45%] text-center rounded-3xl">
                  <p>Register</p>
                </div>
              </header>
              <form
                id="leftsideRegistration"
                action=""
                onSubmit={handleRegister}
                className="flex flex-col justify-evenly items-center"
              >
                <div className="flex flex-wrap justify-center">
                  <div>
                    <MinicardLogin
                      key={0}
                      label={"Name :"}
                      name={"Name"}
                      value={form.Name}
                      onChange={handleChange}
                      divwidth={"40vh"}
                      width={"100%"}
                    />
                  </div>
                  <div>
                    <MinicardLogin
                      label={"Confirm Name :"}
                      key={1}
                      name={"Confirm_Name"}
                      value={form.Confirm_Name}
                      onChange={handleChange}
                      divwidth={"40vh"}
                      width={"100%"}
                    />
                  </div>
                  <div>
                    <MinicardLogin
                      key={3}
                      label={"Email :"}
                      type={"email"}
                      name={"Email"}
                      value={form.Email}
                      onChange={handleChange}
                      divwidth={"40vh"}
                      width={"100%"}
                    />
                  </div>
                  <div>
                    <MinicardLogin
                      key={2}
                      label={"Contact :"}
                      name={"Contact"}
                      value={form.Contact}
                      type={"tel"}
                      onChange={handleChange}
                      divwidth={"40vh"}
                      width={"100%"}
                    />
                  </div>
                  <div>
                    <MinicardLogin
                      key={4}
                      label={"Department :"}
                      name={"Department"}
                      value={form.Department}
                      onChange={handleChange}
                      divwidth={"40vh"}
                      width={"100%"}
                    />
                  </div>
                  <div>
                    <MinicardLogin
                      key={5}
                      label={"Designation :"}
                      name={"Designation"}
                      value={form.Designation}
                      onChange={handleChange}
                      divwidth={"40vh"}
                      width={"100%"}
                    />
                  </div>
                  <div>
                    <MinicardLogin
                      key={6}
                      label={"Role :"}
                      name={"Role"}
                      value={form.Role}
                      onChange={handleChange}
                      type={"radio"}
                      width={"100%"}
                      radioOptions={[
                        { value: "admin", label: "Admin" },
                        { value: "employee", label: "Employee" },
                      ]}
                    />
                  </div>
                  <div>
                    <MinicardLogin
                      key={13}
                      label={"Address:"}
                      name={"Address"}
                      value={form.Address2}
                      onChange={handleChange}
                      textarea={true}
                      // height={"4vh"}
                      divwidth={"40vh"}
                      width={"100%"}
                    />
                  </div>
                  <div>
                    <MinicardLogin
                      key={7}
                      label={"Password :"}
                      name={"Password"}
                      value={form.Password}
                      onChange={handleChange}
                      divwidth={"40vh"}
                      width={"100%"}
                    />
                  </div>
                  <div>
                    <MinicardLogin
                      key={8}
                      label={"Confirm Password :"}
                      name={"Confirm_Password"}
                      value={form.Confirm_Password}
                      onChange={handleChange}
                      divwidth={"40vh"}
                      width={"100%"}
                    />
                  </div>
                </div>
                <section className="flex-col flex w-full">
                  <header className="flex justify-center items-center">
                    <button
                      type="submit"
                      className="w-[35%] h-[6vh] text-center bg-[#ffffff99] rounded-xl flex justify-center items-center shadow-[inset_0_0_20px_3px_rgba(0,255,0)] hover:shadow-[inset_0_0_0] hover:bg-[#00ff00] transition-colors duration-300"
                    >
                      Register
                    </button>
                  </header>
                  <footer className="p-1 self-start">
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

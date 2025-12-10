import React, { useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import ClickSpark from "../../components/UI/ClickSpark";
import AuthLogo from "../../components/Auth/AuthLogo";
import MinicardLogin from "../../components/Auth/MinicardLogin";
import { MdOutlineMail } from "react-icons/md";
import toast, { Toaster } from "react-hot-toast";
import emailjs from "@emailjs/browser";
import { useNavigate } from "react-router";
import { useContext } from "react";
import { ContextApi } from "../../context/ContextProvider";

const ForgotPassword = () => {
  const initialOtp = { box1: "", box2: "", box3: "", box4: "" };

  const navigate = useNavigate();
  const { data,showOtp,setShowOtp,email, setEmail } = useContext(ContextApi);

  const [otp, setOtp] = useState(initialOtp);
  const [generatedOtp, setGeneratedOtp] = useState("");

  // Generate 4-digit OTP
  const generateOtp = () => Math.floor(1000 + Math.random() * 9000).toString();
  

  // Handle OTP input change
  const handleOtpChange = (e) => {
    const { name, value } = e.target;

    if (!/^[0-9]?$/.test(value)) return; // only digits

    setOtp((prev) => ({ ...prev, [name]: value }));

    if (value !== "") {
      const nextInput = document.querySelector(
        `input[name=box${Number(name.slice(-1)) + 1}]`
      );
      nextInput?.focus();
    }
  };

  // Backspace auto-focus to previous box
  const handleKeyDown = (e) => {
    if (e.key === "Backspace" && e.target.value === "") {
      const prevInput = document.querySelector(
        `input[name=box${Number(e.target.name.slice(-1)) - 1}]`
      );
      prevInput?.focus();
    }
  };

  // Send OTP using EmailJS
  const handleSendOtp = () => {
    if (!email.trim()) {
      toast.error("Enter email first!");
      return;
    }

    if (data) {
      data.map((u) => {
        if (u.Email === email) {
          const newOtp = generateOtp();
          console.log(newOtp);
          setGeneratedOtp(newOtp);
          sendotp(newOtp);
        }
      });
    }else{
      toast.error("some error with database contacting Admin.....")
    }

    async function sendotp(newOtp) {
      try {
        await emailjs.send(
          import.meta.env.VITE_EMAILJS_SERVICE_ID,
          import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
          {
            email: email, // MUST MATCH {{email}}
            passcode: newOtp, // MUST MATCH {{passcode}}
            time: "15 minutes", // MUST MATCH {{time}}
          },
          import.meta.env.VITE_EMAILJS_PUBLIC_KEY
        );

        toast.success("OTP sent successfully!");
        setShowOtp(!showOtp);
      } catch (error) {
        console.error(error);
        toast.error("Failed to send OTP");
      }
    }
  };

  // Final user-entered OTP
  const enteredOtp = `${otp.box1}${otp.box2}${otp.box3}${otp.box4}`;

  function VerifyOTP() {
    return () => {
      if (enteredOtp.length < 4) {
        toast.error("Enter full OTP!");
        return;
      }

      if (enteredOtp === generatedOtp) {
        toast.success("OTP Verified!");

        // OPTIONAL -> Redirect to Reset Password Page
        navigate("/reset_password");
      } else {
        toast.error("Wrong OTP!");
      }
    };
  }

  return (
    <ClickSpark
      sparkColor="#fff"
      sparkSize={10}
      sparkRadius={20}
      sparkCount={10}
      duration={200}
    >
      <section className="flex flex-col justify-center items-center">
        <Navbar />
        <Toaster />

        <section className="bg-[#00000041] mx-[10%] my-[5%] rounded-2xl customshadow p-3 flex justify-center items-center">
          <section className="blue-metal h-[90vh] p-5 flex justify-evenly my-5 rounded-2xl customshadow w-[98%]">
            <section id="right" className="flex">
              <AuthLogo className="flex flex-col justify-evenly items-center" />
            </section>

            <section id="left" className="w-[200%]">
              <header className="flex justify-center">
                <div className="text-3xl text-center customshadow rounded-3xl mb-[20vh] w-[50%]">
                  Forgot Password
                </div>
              </header>

              <main className="p-4 rounded-2xl">
                {/* Email Input */}
                <div className="relative">
                  <div className="absolute bottom-[0.5vh] flex justify-center items-center w-[2.9vw] text-[26px] h-[3.8vh] bg-[#9eff80] rounded-l-md left-[3.9vw]">
                    <MdOutlineMail />
                  </div>

                  <MinicardLogin
                    label="Email :"
                    type="email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    paddingL="40px"
                    width={"100%"}
                  />
                </div>

                {/* Send OTP Button */}
                <div className="customshadow w-[30%] text-center rounded-full bg-white m-4 text-2xl hover:bg-[#00ff00] transition-colors duration-300">
                  <button onClick={handleSendOtp}>Send OTP</button>
                </div>

                {/* OTP Box */}
                {showOtp && (
                  <div className="customshadow rounded-2xl p-[0.1vh]">
                    <div className="text-2xl mt-9 ml-9">OTP :</div>

                    <div className="flex justify-center gap-2 m-6">
                      {["box1", "box2", "box3", "box4"].map((box) => (
                        <div
                          key={box}
                          className="flex justify-center items-center w-[18%] bg-white shadow-[inset_0_0_10px_1px_rgb(0,0,0)] rounded-xl border h-[11vh]"
                        >
                          <input
                            type="text"
                            name={box}
                            value={otp[box]}
                            onChange={handleOtpChange}
                            onKeyDown={handleKeyDown}
                            maxLength={1}
                            className="w-[5vw] h-[10vh] rounded-xl text-center text-4xl font-semibold"
                          />
                        </div>
                      ))}
                    </div>

                    {/* VERIFY OTP BUTTON */}
                    <div className="flex justify-center">
                      <button
                        onClick={VerifyOTP()}
                        className="customshadow bg-white text-2xl px-6 py-2 mb-3 rounded-full hover:bg-[#00ff00] transition duration-300"
                      >
                        Verify OTP
                      </button>
                    </div>
                  </div>
                )}
              </main>
            </section>
          </section>
        </section>
      </section>
    </ClickSpark>
  );
};

export default ForgotPassword;

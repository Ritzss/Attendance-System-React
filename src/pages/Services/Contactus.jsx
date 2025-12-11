import { useContext, useState } from "react";
import AuthLogo from "../../components/Auth/AuthLogo";
import MinicardLogin from "../../components/Auth/MinicardLogin";
import { ContextApi } from "../../context/ContextProvider";
import emailjs from "@emailjs/browser";
import { FaFacebookF, FaInstagram, FaLinkedin } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import LogoLoop from "../../components/UI/LogoLoop";
import ADSLogo from "../../Assets/Images/navlogo.png";
import VastraLogo from "../../Assets/Images/vastradrobe.png";
//! HAVE TO MAKE IT RESPONSIVE
const Contactus = () => {
  const { currentUser } = useContext(ContextApi);

  const [form, setForm] = useState({
    name: currentUser?.Name || "",
    email: currentUser?.Email || "",
    subject: "",
    message: "",
  });

  const handleChange = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const sendInquiry = (e) => {
    e.preventDefault();

    emailjs
      .send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_ContactUs_TEMPLATE_ID,
        {
          user_name: form.name,
          user_email: form.email,
          user_subject: form.subject,
          user_message: form.message,
        },
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      )
      .then(() => {
        alert("Inquiry Sent Successfully!");
      })
      .catch(() => {
        alert("Failed to send inquiry");
      });
  };
 

  // Alternative with image sources
  const imageLogos = [
    {
      src: `${ADSLogo}`,
      alt: "Company 1",
      href: "https://ads247365.com/",
    },
    {
      src: `${VastraLogo}`,
      alt: "Company 2",
      href: "https://vastradrobe.com/",
    },
  ];

  return (
    <section className=" ContactBlock p-7 rounded-t-xl combine-metal flex flex-col justify-evenly items-center">
      <header className="h-[60vh]  w-[60%]">
        <AuthLogo className="w-full gap-15 flex-col flex justify-evenly items-center" />
      </header>

      <main className="mb-8">
        <div
          style={{ height:"auto",width:"99vw", position: "relative", overflow: "" }}
        >
          {/* Basic horizontal loop */}
          <LogoLoop
            logos={imageLogos}
            speed={200}
            direction="left"
            logoHeight={88}
            gap={40}
            hoverSpeed={0}
            maxCopies={6}
            scaleOnHover
            fadeOut
            fadeOutColor="#ffffff00"
            ariaLabel="Technology partners"
          />
        </div>
      </main>

      <footer className="w-[99vw] h-[66vh] bg-black relative  text-white flex justify-between items-center">
        {/* LEFT SIDE FORM */}
        <div className="mx-4 p-4 border border-orange-600 customshadow bg-[#505050] px-3 rounded-2xl">
          <div className="text-4xl font-bold">Connect With Us :</div>
          <form className="w-[40vw] flex flex-col">
            <div className="">
              <MinicardLogin
                label="Email :"
                type="email"
                name="email"
                value={form.email}
                onChange={(e) => handleChange("email", e.target.value)}
                paddingL="0px"
                width="100%"
              />
            </div>
            <MinicardLogin
              label="Name :"
              name="name"
              value={form.name}
              onChange={(e) => handleChange("name", e.target.value)}
              paddingL="0px"
              width="100%"
            />

            <MinicardLogin
              label="Subject :"
              name="subject"
              value={form.subject}
              onChange={(e) => handleChange("subject", e.target.value)}
              paddingL="0px"
              width="100%"
            />

            {/* TEXTAREA for message */}
            <MinicardLogin
              label="Message :"
              name={"message"}
              textarea={true}
              paddingL={"0px"}
              width={"100%"}
              value={form.message}
              onChange={(e) => handleChange("message", e.target.value)}
            />
          </form>
        </div>
        {/* Submit Button */}
        <button
          type="submit"
          onClick={sendInquiry}
          className="absolute left-[33vw] -bottom-4 p-3 self-end w-[40%] bg-blue-600 rounded-2xl  hover:bg-blue-700 transition"
        >
          Send Inquiry
        </button>

        {/* RIGHT SIDE */}
        <div className="w-[40vw] flex-col flex gap-15 h-full py-[5vh]">
          <div className="text-4xl font-bold text-white">
            Social Media Links:
          </div>

          <div className="text-3xl pl-15 gap-5 flex flex-col">
            {/* Instagram (Gradient Text) */}
            <a
              href="https://instagram.com"
              target="blank"
              className="flex gap-6"
            >
              <span className=" h-[6vh] bg-linear-to-r from-[#F58529] via-[#DD2A7B] to-[#515BD4] bg-clip-text text-transparent">
                Instagram
              </span>
              <FaInstagram className="bg-linear-to-r from-[#F58529] via-[#DD2A7B] to-[#515BD4] rounded-lg " />
            </a>

            {/* Facebook */}
            <a
              href="https://facebook.com"
              target="blank"
              className="flex gap-8"
            >
              <span className="text-[#1877F2] hover:text-shadow-[0_0_10px_#1877F2]">
                Facebook
              </span>
              <FaFacebookF className="text-[#1877F2]" />
            </a>

            {/* LinkedIn */}
            <a
              href="https://linkedin.com"
              target="blank"
              className="flex gap-12"
            >
              <span className="text-[#0A66C2] hover:text-shadow-[0_0_10px_#0A66C2]">
                LinkedIn
              </span>
              <FaLinkedin className="text-[#0A66C2]" />
            </a>

            {/* X / Twitter */}
            <a href="https://x.com" target="blank" className="flex gap-18">
              <span className=" hover:text-shadow-[0_0_10px_#ffffff]">
                Twitter
              </span>
              <FaXTwitter className="text-white" />
            </a>
          </div>
        </div>
      </footer>
    </section>
  );
};
export default Contactus;

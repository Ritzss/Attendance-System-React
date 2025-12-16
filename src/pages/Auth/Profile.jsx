import React from "react";
import { useContext } from "react";
import { useState } from "react";
import toast from "react-hot-toast";
import { ContextApi } from "../../context/ContextProvider";
import { MdOutlineDriveFileRenameOutline, MdOutlineMail } from "react-icons/md";
import { IoMdContact } from "react-icons/io";
import { GiOfficeChair } from "react-icons/gi";
import { FaAddressCard, FaUserTie } from "react-icons/fa";

const Profile = () => {
  const [preview, setPreview] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const { currentUser, updateProfileImage } = useContext(ContextApi);

  const handleFileChange = (e) => {
    console.log(e.target.files);
    const file = e.target.files[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file");
      return;
    }
    const imageUrl = URL.createObjectURL(file);
    setSelectedFile(file);
    setPreview(imageUrl);
  };

  const handlePreview = (e) => {
    e.preventDefault();
    setPreview(null);
  };

  const handlePicSubmit = (e) => {
    e.preventDefault();
    if (!selectedFile) {
      toast.error("No image selected");
      return;
    }

    updateProfileImage(selectedFile);
    setPreview(null);
  };

  return (
    <section className="w-[95%] m-auto h-screen flex gap-4 bg-[#00000066] shadow-[inset_0_0_20px_10px_rgba(0,0,0)] border-3 rounded-2xl ">
      <article className=" w-[95%] m-auto ">
        <div className="w-full flex p-[2%] py-24 flex-col  rounded-2xl ">
          <form
            action=""
            className=" flex justify-evenly text-white gap-6 w-full h-full"
          >
            {currentUser.profileimage ? (
              <div
                id="rightsideProfilewithPic"
                className=" w-[45%] flex m-3 gap-2 items-start flex-col"
              >
                <img
                  src={`http://localhost:5000${currentUser.profileimage}`}
                  alt="Preview"
                  className="rounded-full w-[20vw] h-[35vh] "
                />
                <div className="self-end flex gap-3">
                  <button
                    onClick={handlePicSubmit}
                    className="bg-slate-500 self-end border p-1 rounded-md"
                  >
                    Confirm Profile Image
                  </button>
                  <div className="bg-slate-500 self-end border p-1 rounded-md">
                  <label htmlFor="Image" >Choose Another</label>
                    <input
                    accept="image/*"
                    onChange={handleFileChange}
                    type="file"
                    name="Image"
                    id="Image"
                    hidden
                  />
                  </div>
                </div>
              </div>
            ) : preview ? (
              <div
                id="rightsideProfilewithPic"
                className=" w-[45%] flex m-3 gap-2 items-start flex-col"
              >
                <img src={preview} alt="Preview" className="rounded-full  " />
                <div className="self-end flex gap-3">
                  <button
                    onClick={handlePicSubmit}
                    className="bg-slate-500 self-end border p-1 rounded-md"
                  >
                    Confirm Profile Image
                  </button>
                  <button
                    onClick={handlePreview}
                    className="bg-slate-500 self-end border p-1 rounded-md"
                  >
                    Choose Another
                  </button>
                </div>
              </div>
            ) : (
              <div id="rightsideProfile" className=" w-[45%] ">
                <label htmlFor="Image" className="text-3xl font-bold">
                  Choose Profile Image :
                </label>
                <div className="flex">
                  <input
                    accept="image/*"
                    onChange={handleFileChange}
                    type="file"
                    name="Image"
                    id="Image"
                    hidden
                  />
                </div>
              </div>
            )}

            <div
              id="leftsideProfile"
              className="flex flex-wrap mt-[30vh] text-white justify-evenly w-full "
            >
              <div key={"name_attribute"} className="w-full  m-2 relative">
                <div className=" absolute right-0 bottom-1 text-3xl flex justify-center items-center rounded-l-md bg-[9eff80] h-[3.8vh] w-[3vw]">
                  <MdOutlineDriveFileRenameOutline />
                </div>
                <div className="w-full h-full p-2 rounded-2xl text-2xl ">
                  <div className=" text-7xl text-shadow-[0_0_12px_#fff] font-bold italic">
                    {currentUser.Name}
                  </div>{" "}
                </div>
              </div>
              <div key={"Email"} className="w-[48%] m-2 relative">
                <div className=" absolute right-0 bottom-1 text-3xl flex justify-center items-center rounded-l-md bg-[9eff80] h-[3.8vh] w-[3vw]">
                  <MdOutlineMail />
                </div>
                <div className="w-full h-full p-2 text-2xl ">
                  Email : <div className="">{currentUser.Email}</div>{" "}
                </div>
              </div>
              <div key={"Contact"} className="w-[48%] m-2 relative">
                <div className=" absolute right-0 bottom-1 text-3xl flex justify-center items-center rounded-l-md bg-[9eff80] h-[3.8vh] w-[3vw]">
                  <IoMdContact />
                </div>
                <div className="w-full h-full p-2  text-2xl ">
                  Contact : <div className="">{currentUser.Contact}</div>{" "}
                </div>
              </div>
              <div key={"Department"} className="w-[48%] m-2 relative">
                <div className=" absolute right-0 bottom-1 text-3xl flex justify-center items-center rounded-l-md bg-[9eff80] h-[3.8vh] w-[3vw]">
                  <GiOfficeChair />
                </div>
                <div className="w-full h-full p-2  text-2xl ">
                  Department : <div className="">{currentUser.Department}</div>{" "}
                </div>
              </div>
              <div key={"Designation"} className="w-[48%] m-2 relative">
                <div className=" absolute right-0 bottom-1 text-3xl flex justify-center items-center rounded-l-md bg-[9eff80] h-[3.8vh] w-[3vw]">
                  <FaUserTie />
                </div>
                <div className="w-full h-full p-2  text-2xl ">
                  Designation :{" "}
                  <div className="">{currentUser.Designation}</div>
                </div>
              </div>
              <div key={"AddressDiv"} className="w-full m-2 relative">
                <div className=" absolute right-0 bottom-1 text-3xl flex justify-center items-center rounded-l-md bg-[9eff80] h-[4vh] w-[3vw]">
                  <FaAddressCard />
                </div>
                <div className="w-full h-full p-2  text-2xl ">
                  Address : <div className="">{currentUser.Address}</div>{" "}
                </div>
              </div>
            </div>
          </form>
        </div>
      </article>
    </section>
  );
};

export default Profile;

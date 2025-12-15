import React from "react";
import { useState } from "react";
import toast from "react-hot-toast";

const Profile = () => {
  const [preview, setPreview] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // ✔ allow images only
    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file");
      return;
    }

    const imageUrl = URL.createObjectURL(file);
    setPreview(imageUrl);
  };

  return (
    <section className="w-full h-screen flex gap-4  border-3 rounded-2xl ">
      <article className=" w-[95%] m-5 h-[33.3%]  ">
        <div className="w-[18%] h-full flex justify-center rounded-full border ">
          <form
            action=""
            className="flex-col flex justify-center items-center "
          >
            {preview ? (
              <div>
                <img
                  src={preview}
                  alt="Preview"
                  className="w-full rounded-full mb-53 "
                />
                <button onClick={()=>setPreview("")}>Choose Another</button>
              </div>
            ) : (
              <div>
                <label htmlFor="Image" className="text-3xl border">
                  Profile Image :
                </label>
                <div className="flex">
                  <input
                    accept="image/*"
                    onChange={handleFileChange}
                    type="file"
                    name="Image"
                    id="Image"
                    hidden
                    value={Image}
                  />
                </div>
              </div>
            )}
          </form>
        </div>
      </article>
    </section>
  );
};

export default Profile;

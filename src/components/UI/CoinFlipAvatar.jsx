import { useEffect, useState,useContext } from "react";
import maleimg from "../../Assets/Images/maleprofile.png";
import femaleimg from "../../Assets/Images/femaleprofile.png";
import { ContextApi } from "../../context/ContextProvider";

export default function CoinFlipAvatar() {
  const images = [maleimg, femaleimg];
  const [index, setIndex] = useState(0);
  const [flip, setFlip] = useState(false);
  let {marked} = useContext(ContextApi);

  useEffect(() => {
    const interval = setInterval(() => {
      setFlip(true);

      // Wait for flip animation then switch
      setTimeout(() => {
        setIndex((prev) => (prev === 0 ? 1 : 0));
        setFlip(false);
      }, 500);
    }, 3000); // change every 3 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className=" flex justify-center items-center w-[40vh] h-[35vh] rounded-full mx-auto">
      <img
        src={images[index]}
        className={`
          w-full h-full  object-contain rounded-full transition-transform duration-1000
          ${flip ? "rotate-y-180" : ""}
        `}
        style={{
          transformStyle: "preserve-3d",
          border: marked ? "10px solid green" : "10px solid red",
        }}
        alt="avatar"
      />
    </div>
  );
}

import { NavLink } from "react-router";
import SpotlightCard from "../UI/SpotLightCard";

const MiniCard = ({ color, title, route }) => {
  return (
    <NavLink to={route} 
      
    className="border shadow-[inset_0_0_20px_rgba(255,255,255,0.7)] border-white rounded-4xl mx- m-2 w-full h-[15vh]"
    >
      <SpotlightCard className={`text-white  flex justify-center items-center h-full w-full text-3xl`}
        spotlightColor={`${color}`}>
        <div className={` bg-clip-text font-semibold text-transparent `} style={{ backgroundColor: color || "#ffffff"}}>{title || "Mini Card"}</div>
      </SpotlightCard>
    </NavLink>
  );
};
export default MiniCard;

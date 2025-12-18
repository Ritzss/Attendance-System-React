import { NavLink } from "react-router";

const MiniCard = ({ color, title, route }) => {
  return (
    <NavLink to={route} 
      style={{ backgroundColor: color || "#ffffff20" }}
      
    className="border shadow-[inset_0_0_20px_rgba(255,255,255,0.7)] border-white rounded-4xl mx- m-2 w-full h-[15vh]"
    >
      <div className="text-white flex justify-center items-center h-full w-full text-3xl" >
        <div>{title || "Mini Card"}</div>
      </div>
    </NavLink>
  );
};
export default MiniCard;

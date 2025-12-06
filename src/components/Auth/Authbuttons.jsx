import React from 'react'
import { NavLink } from 'react-router';

const Authbuttons = (props) => {
     return (
        <header className="flex justify-center gap-2 items-center w-full h-full">
          <NavLink
            to={props.navTo}
            className=" w-[50%] text-center h-[40%] bg-[#ffffff99] rounded-xl flex justify-center shadow-[inset_0_0_20px_3px_rgba(0,255,0)] hover:shadow-[inset_0_0_0] hover:bg-[#00ff00] transition-colors duration-300"
          >
            <div onClick={props.handleLogin} className="flex justify-center items-center">
              <button >{props.label1 || "Login" }</button>
            </div>
          </NavLink>
         
        </header>
      );
}

export default Authbuttons
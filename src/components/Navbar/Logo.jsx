import React from 'react';
import headerimg from '../../Assets/Images/navlogo.png';
import { NavLink } from 'react-router';

const Logo = ({className}) => {


  return (
    <div>
      <NavLink to={"/"}>
      <img src={headerimg} className={className || "w-[5vw] h-[5vh]"}  alt='Ads247365.com'/>
      </NavLink>
    </div>
  )
}

export default Logo
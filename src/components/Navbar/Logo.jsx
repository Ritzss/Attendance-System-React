import React from 'react';
import headerimg from '../../Assets/Images/navlogo.png';
import { NavLink } from 'react-router';

const Logo = ({className}) => {


  return (
    <div>
      <NavLink to={"/"}>
      <img src={headerimg} className={className || " w-[35%] h-[25%]"}  alt='Ads247365.com'/>
      </NavLink>
    </div>
  )
}

export default Logo
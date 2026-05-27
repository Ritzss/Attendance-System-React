import React from 'react';
import headerimg from '../../Assets/Images/navlogo.png';
import { NavLink } from 'react-router';

const Logo = ({className}) => {


  return (
    <div className=' LogoContainer '>
      <NavLink  to={"/"}>
      <img src={headerimg} className={className}  alt='Ads247365.com'/>
      </NavLink>
    </div>
  )
}

export default Logo
import React, { useContext } from 'react'
import { ContextApi } from '../../context/ContextProvider'
import { NavLink } from 'react-router';

const AuthNav = () => {

  const {loggin, setLoggin, data}  = useContext(ContextApi);
  // console.log(user,setUser,data);
  
  

  return (
    <div>
      {loggin ?<span className='flex gap-2'>
        <span>Profile{data?.[0]?.name}</span>
        <span>
          <button onClick={()=>{setLoggin(false)}}>Logout</button>
        </span>
        </span> : <span className='flex gap-2'>
          <span>
            <NavLink to={"/"}>Login</NavLink>  
          </span>/<span>
            <NavLink to={"/"}>Register</NavLink>  
          </span>
        </span>

      }
    </div>
  );
};

export default AuthNav;

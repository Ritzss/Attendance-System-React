import React from 'react'
import { useContext } from 'react'
import { NavLink } from 'react-router'
import { ContextApi } from '../../context/ContextProvider'

const Body = () => {

  let {authUser,loggin} = useContext(ContextApi)

  return (
    <section >
      {loggin && authUser=="employee" &&
      <div className='flex gap-7'>
        <header>
        <NavLink to={'home'}>Home</NavLink>
      </header>
      <main className='flex gap-7'>
        <span>
        <NavLink to={"break"}>Break</NavLink>
        </span>
        <span>
        <NavLink to={"leaveportal"}>Leave Portal</NavLink>
        </span>
        <span>
        <NavLink to={"holiday"}>Holiday</NavLink>
        </span>
      </main>
      <footer>
        <NavLink to={"contactus"}>Contact Us</NavLink>
      </footer>
      </div>
      }{loggin && authUser=="admin" &&
      <div className='flex gap-7'>
        <header>
        <NavLink to={'home'}>Home</NavLink>
      </header>
      <main className='flex gap-7'>
        <span>
        <NavLink to={"break"}>Break Management</NavLink>
        </span>
        <span>
        <NavLink to={"leaveportal"}>Leave Approval</NavLink>
        </span>
      </main>
      <footer>
        <NavLink to={"contactus"}>Attendance Management</NavLink>
      </footer>
      </div>}
    </section>
  )
}

export default Body
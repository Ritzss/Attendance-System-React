import React from 'react'
import { NavLink } from 'react-router'

const Body = () => {
  return (
    <section className='flex gap-7'>
      <header>
        <NavLink to={'/'}>Home</NavLink>
      </header>
      <main className='flex gap-7'>
        <span>
        <NavLink to={"/"}>Break</NavLink>
        </span>
        <span>
        <NavLink to={"/"}>Leave Portal</NavLink>
        </span>
      </main>
      <footer>
        <NavLink to={"/"}>Contact Us</NavLink>
      </footer>
    </section>
  )
}

export default Body
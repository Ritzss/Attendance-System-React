import React from 'react'
import Body from './Body'
import AuthNav from '../Auth/AuthNav'
import Logo from './Logo'

//! HAVE TO MAKE IT RESPONSIVE

const Navbar = () => {
  return (
    <section className='NavBLock flex gap-69 border shadow-[inset_0_0_20px_rgba(0,0,0,0.3)] items-center text-white h-[10vh] backdrop-blur-lg bg-[#ffffff10] rounded-4xl p-6' >
        <article className='LogoBlock'>
            <header>
                <Logo />
            </header>
        </article>
        <article>
            <main>
                <Body />
            </main>
        </article>
        <article>
            <footer>
                <AuthNav />
            </footer>
        </article>
    </section>
    
  )
}

export default Navbar
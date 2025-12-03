import React from 'react'
import Body from './Body'
import AuthNav from '../AuthComponent/AuthNav'
import Logo from './Logo'

const Navbar = () => {
  return (
    <section className='flex sticky justify-between border shadow-[inset_0_0_20px_rgba(0,0,0,0.3)] items-center text-white w-[80vw] ml-[20vh] m-[6vh] h-[8vh] backdrop-blur-lg bg-[#ffffff10] rounded-4xl p-6' >
        <article>
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
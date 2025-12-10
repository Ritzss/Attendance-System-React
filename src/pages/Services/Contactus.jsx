import React from 'react'
import AuthLogo from '../../components/Auth/AuthLogo'

const Contactus = () => {
  return (
    <section className='h-screen flex-col flex justify-evenly items-center gap-15'>
      <header className='flex h-[40%] justify-center '>
        <AuthLogo className={"w-[98%]  blue-metal rounded-3xl px-40 flex-col flex justify-evenly items-center"}/>
      </header>
      <main className=' w-[98%] h-[10%] border'></main>
      <footer className= 'w-full sticky top-[80%] z-10 bg-black '>
        <div className="bg-white w-[20vh] h-[20vh]"></div>
      </footer>
    </section>
  )
}

export default Contactus
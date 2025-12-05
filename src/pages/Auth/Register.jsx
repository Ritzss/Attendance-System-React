import React from 'react'
import Navbar from '../../components/Navbar/Navbar'
import MinicardLogin from '../../components/Auth/MinicardLogin'

const Register = () => {
  return (
    <section className='flex flex-col justify-center items-center'>
        <Navbar />
        <section
          id="login-box"
          className=" bg-[#00000041] w-[95%] rounded-2xl customshadow my-5 flex justify-center items-center"
        >
          <section className='blue-metal h-[80vh] flex flex-wrap my-5 rounded-2xl customshadow w-[98%]'>
            <MinicardLogin name={"Name :"} />
            <MinicardLogin name={"Confirm Name :"} />
            <MinicardLogin name={"Department :"} />
            <MinicardLogin name={"Designation :"} />
            <MinicardLogin name={"Role :"} type={"radio"} radioOptions={[{value:"admin",label:"Admin"},{value:"employee",label:"Employee"}]} />
            <MinicardLogin name={"Password :"} />
            <MinicardLogin name={"Confirm Password :"} />
            <MinicardLogin name={"Confirm Password :"} />

          </section>

        </section>
    
    </section>
  )
}

export default Register
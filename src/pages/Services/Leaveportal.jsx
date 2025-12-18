import React from 'react'
import { PiStarFourFill } from 'react-icons/pi'
//! HAVE TO MAKE IT RESPONSIVE

const Leaveportal = () => {
  return (
     <div>
         <div className="slider AttendanceBlock bg-[#00246f89] rounded-2xl w-[98%] m-auto h-full">
          <div className=" track flex">
            <div className=" flex text-7xl gap-13 text-white transfrom m-4">
              <div className="star text-sm self-end">
                <PiStarFourFill />
              </div>
              <div className="star text-xl self-start">
                <PiStarFourFill />
              </div>
              <div className="star text-2xl self-center">
                <PiStarFourFill />
              </div>
              <div className="star text-3xl self-end">
                <PiStarFourFill />
              </div>
              <div className="star text-4xl self-start">
                <PiStarFourFill />
              </div>
            </div>
            <div className="text-7xl m-4 font-extrabold">
              <span className="text-red-500 drop-shadow-md">
                L
              </span>
              <span className="text-green-500 drop-shadow-md">eave</span>{" "}
              <span className="text-red-500 drop-shadow-md">P</span>
              <span className="text-green-500 drop-shadow-md">ortal</span>
            </div>
    
            <div className="flex text-7xl gap-13 text-white transfrom m-4">
              <div className="star text-4xl self-start">
                <PiStarFourFill />
              </div>
              <div className="star text-3xl self-end">
                <PiStarFourFill />
              </div>
              <div className="star text-2xl self-center">
                <PiStarFourFill />
              </div>
              <div className="star text-xl self-start">
                <PiStarFourFill />
              </div>
              <div className="star text-sm self-end">
                <PiStarFourFill />
              </div>
            </div>
          </div>
        </div>
        <div>
          
        </div>
       </div>
  )
}

export default Leaveportal
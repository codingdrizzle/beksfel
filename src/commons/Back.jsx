import Link from 'next/link';
import React from 'react';
import { FaArrowLeft } from "react-icons/fa6";

const Back = ({to}) => {
  return (
      <Link href={`${to}`} className="group relative block cursor-pointer my-4">
          <div className="w-14 h-14 bg-black rounded-full flex items-center justify-center cursor-pointer z-10 duration-500 hover:scale-110 transition-transform">
              <FaArrowLeft size={25} color='#fff'/>
          </div>
          <div className="w-auto h-10 text-white rounded-lg bg-black absolute px-5 top-[15%] left-[145px] transform -translate-x-full flex items-center justify-center z-0 transition duration-500 opacity-0 group-hover:opacity-100">
              Go Back
          </div>
      </Link>  )
}

export default Back
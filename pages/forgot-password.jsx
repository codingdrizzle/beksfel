import Link from 'next/link';
import { useEffect, useState } from 'react';


const ForgotPassword = () => {

  const handleResestPassword = (event) => {
    event.preventDefault()
  }
  return (
    <div>

      <div className="w-auto relative xs:w-full shadow-none md:w-full md:min-w-[1000px] min-h-[600px] h-[600px] bg-[#ecf0f3] 
      sm:shadow-auth-form-shadow-1 rounded-[12px] overflow-hidden">

        <div className='relative flex justify-items-center  md:absolute top-0 w-[600px] h-full bg-[#ecf0f3]'>
          <form className="flex flex-col justify-center items-center w-full h-full">
            <h2 className="text-2xl py-4 font-semibold leading-[2] text-[#181818] uppercase">forgot password ?</h2>
            <p className='flex flex-wrap font-semibold text-sm p-1 '>Enter email here and we&apos;ll send you a link to reset your password</p>
            <input className="form-input" type="text" placeholder="Email" />
            <button className="auth-button" onClick={handleResestPassword}>Reset Password</button>
          </form>
        </div>


      </div>
    </div>
  )
}


export default ForgotPassword
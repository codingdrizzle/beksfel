import React from 'react'
import Image from 'next/image'
import Logo from '@/assets/forgot-password/undraw_forgot_password.svg'

const ResetLogo = (props) => {

  return (
    <div> 
        <Image  className='flex justify-center h-auto p-1' src={Logo} alt='Reset-Password-logo'  width={props?.width} height={props?.height}/>
    </div>
  )
}
ResetLogo.defaultProps = {
    width: 150,
    height: 'auto',
    
};

export default ResetLogo;
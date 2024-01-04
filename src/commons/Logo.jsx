import React from 'react'
import Image from 'next/image'
import logo from '@/assets/logo/logo.png'

const Logo = (props) => {
  return (
    <Image src={logo} alt='brand-logo' width={props?.width} height={props?.height}/>
  )
}

Logo.defaultProps = {
    width: 120,
    height: 'auto',
};


export default Logo
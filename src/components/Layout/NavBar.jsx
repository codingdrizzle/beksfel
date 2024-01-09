import React from 'react'
import Logo from '../../commons/Logo'

const NavBar = ({isSideBarCollapse}) => {
  return (
      <div className={`w-full fixed top-0 md:left-[70px] md:w-[calc(100%-70px)] bg-green-50 h-16 flex justify-between px-6 z-50 ${isSideBarCollapse ? 'lg:w-[calc(100%-70px)] lg:left-[70px]' : 'lg:w-[calc(100%-250px)] lg:left-[250px]'}`}>
          <div className='md:hidden'><Logo /></div>
            <p>world</p>
        </div>
  )
}

export default NavBar
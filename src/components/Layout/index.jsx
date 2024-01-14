import React, { useState } from 'react'
import SideNav from './SideNav'
import NavBar from './NavBar'

const Layout = ({children}) => {
    const [isSideBarCollapse, setIsSideBarCollapse] = useState(false);

  return (
    <div className='flex'>
          <SideNav isSideBarCollapse={isSideBarCollapse} setIsSideBarCollapse={setIsSideBarCollapse} />
          <NavBar isSideBarCollapse={isSideBarCollapse} />
          <div className={`w-full overflow-hidden bg-transparent pt-[70px] px-6 md:ml-[70px] ${isSideBarCollapse ? 'lg:ml-[70px]' : 'lg:ml-[250px]'}`}>
            {children}
        </div>
    </div>
  )
}

export default Layout
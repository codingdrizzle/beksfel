import React from 'react'
import Logo from '../../commons/Logo'
import Image from 'next/image'
import { useAtomValue } from 'jotai'
import { authUser } from '../../store'

const NavBar = ({ isSideBarCollapse }) => {

    const {firstname, surname} = useAtomValue(authUser)
    return (
        <div className={`w-full fixed top-0 md:left-[70px] md:w-[calc(100%-70px)] bg-white shadow-md h-16 flex justify-between md:justify-end items-center px-6 z-50 ${isSideBarCollapse ? 'lg:w-[calc(100%-70px)] lg:left-[70px]' : 'lg:w-[calc(100%-250px)] lg:left-[250px]'}`}>
            <div className='md:hidden'><Logo width={80} height={80} /></div>
            <div>
                <div className="flex items-center justify-end">
                    <Image src="https://images.unsplash.com/photo-1529665253569-6d01c0eaf7b6?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cHJvZmlsZXxlbnwwfHwwfHx8MA%3D%3D" alt="User Profile" width={100} height={100} className="h-12 w-12 rounded-full object-cover" />
                    <div className="ml-3">
                        <h3 className="text-lg font-semibold">{`${firstname} ${surname}`}</h3>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NavBar
import React, { useEffect, useState } from 'react'
import { FaCaretLeft, FaCaretRight } from "react-icons/fa6";
import { TbNavigationFilled } from "react-icons/tb";
import { FaSignOutAlt } from "react-icons/fa";
import Logo from '../../commons/Logo'
import { NavItems } from '../../utils/nav-items'
import { useRouter } from 'next/router';
import {SideNavCollapse,SideNavCollapseMobile} from './SideNavCollapse'

const SideNav = ({ isSideBarCollapse, setIsSideBarCollapse }) => {
    const [showAssistiveMenuDisabler, setShowAssistiveMenuDisabler] = useState(false)
    const router = useRouter()

    const activeAssistiveMenu = () => {
        setShowAssistiveMenuDisabler(true);
        const myDiv = document.getElementById('myDiv');
        myDiv.classList.add('move-to-bottom');
    }

    const deactivateAssistiveMenu = () => {
        const myDiv = document.getElementById('myDiv');
        myDiv.classList.remove('move-to-bottom');
        setShowAssistiveMenuDisabler(false);
    }

    useEffect(() => {
        window.addEventListener('resize', () => {
            if (window.matchMedia('(min-width: 768px) and (max-width: 1024px)').matches) return setIsSideBarCollapse(true);
            if (window.matchMedia('(min-width: 1024px)').matches) return setIsSideBarCollapse(prev => !prev);
        });
    }, [setIsSideBarCollapse]);

    return (
        <>
            <div className={`hidden md:block fixed w-[70px] bg-white h-screen ${isSideBarCollapse ? 'lg:w-[70px]' : 'lg:w-[250px]'}`}>
                <div className={`w-full h-auto flex justify-center items-center py-14 ${isSideBarCollapse ? 'h-40' : ''}`}>
                    <Logo />
                </div>
                <SideNavCollapse title={'Navigations'} isSideBarCollapse={isSideBarCollapse} dataSource={NavItems} />
                <SideNavCollapse title={'Apps'} isSideBarCollapse={isSideBarCollapse} dataSource={NavItems} />

                <button className='absolute bottom-0 p-7 flex justify-start items-center text-xl space-x-2 hover:text-blue-400'>
                    <FaSignOutAlt />
                    {!isSideBarCollapse && <span className='text-base'>Logout</span>}
                </button>

                {isSideBarCollapse ?
                    <FaCaretRight onClick={() => setIsSideBarCollapse(!isSideBarCollapse)} className={`hidden lg:block cursor-pointer text-2xl absolute bottom-20 left-[60px] z-50`} /> :
                    <FaCaretLeft onClick={() => setIsSideBarCollapse(!isSideBarCollapse)} className={`hidden lg:block cursor-pointer text-2xl absolute bottom-20 left-[235px] z-50`} />
                }
            </div>

            {/* Mobile */}
            <button className={`${showAssistiveMenuDisabler ? 'fixed block inset-0 bg-opacity-50 backdrop-blur-sm h-full w-full z-[60]' : 'hidden'} `} onClick={deactivateAssistiveMenu}>
                <div className='fixed inset-0 bg-black bg-opacity-50'></div>
            </button>
            <button id='myDiv' className='fixed bottom-10 right-10 bg-red-400 w-16 h-16 cursor-pointer rounded-full flex justify-center items-center md:hidden z-[70]' onClick={activeAssistiveMenu}>
                {
                    showAssistiveMenuDisabler ?
                        <SideNavCollapseMobile dataSources={[NavItems, NavItems]}/> :
                        <TbNavigationFilled size={40} color='#fff' />
                }
            </button>
        </>
    )
}

export default SideNav
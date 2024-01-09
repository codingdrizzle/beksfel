import { useRouter } from 'next/router';
import React, { useState } from 'react'

export const SideNavCollapse = ({ title, isSideBarCollapse, dataSource }) => {
    const router = useRouter()
    const [showCollapsedDropdown, setShowCollapsedDropdown] = useState(false);
    const [activeSubMenu, setActiveSubMenu] = useState(null);

    const toggleSubItems = (index) => {
        setActiveSubMenu(activeSubMenu === index ? null : index);
    };


    const handleNavigate = (index, route = '', hasSubItems = false, isSubItem = false) => {
        !isSubItem && toggleSubItems(index);
        if (index) setShowCollapsedDropdown(prev => !prev)

        if (route === '') return;
        if (!hasSubItems) return router.push(route)
    }

    return (
        <div className={`w-full h-auto border-b-[1px] border-[#ecf0f3] flex justify-center flex-col space-y-2 py-4 ${isSideBarCollapse ? '' : 'px-7'}`}>
            {!isSideBarCollapse && <p className='uppercase font-semibold'>{title}</p>}
            {
                dataSource.map((item, index) => {
                    return (
                        <div key={index}>
                            {item.subItems ? (
                                <div className='group relative'>
                                    <button
                                        className={`flex items-center space-x-2 text-xl h-12 w-full hover:text-blue-400 ${isSideBarCollapse ? 'justify-center' : ''}`}
                                        onClick={() => handleNavigate(index)}
                                    >
                                        {item.icon} {!isSideBarCollapse && <span className='text-base'>{item.name}</span>}
                                    </button>
                                    <div className={`${isSideBarCollapse ? 'hidden group-hover:flex absolute w-24 h-12 bg-white top-0 left-[70px] justify-start items-center' : 'hidden'}`}>
                                        <span onClick={() => handleNavigate(index)} className='cursor-pointer '>{item.name}</span>
                                        {
                                            showCollapsedDropdown &&
                                            <div className='flex flex-col absolute top-0 w-32 p-3 bg-white space-y-2'>
                                                {item.subItems.map((subItem, subIndex) => (
                                                    <button
                                                        key={subIndex}
                                                        className={`flex items-center bg-white hover:text-blue-400`}
                                                        onClick={() => handleNavigate(index, subItem.route, false, true)}
                                                    >
                                                        <span>{subItem.name}</span>
                                                    </button>
                                                ))}
                                            </div>
                                        }
                                    </div>
                                </div>
                            ) : (
                                <div className='group relative'>
                                    <button
                                        className={`flex items-center space-x-2 text-xl h-12 w-full hover:text-blue-400 ${isSideBarCollapse ? 'justify-center' : ''}`}
                                        onClick={() => handleNavigate(index, item.route)}
                                    >
                                        {item.icon} {!isSideBarCollapse && <span className='text-base'>{item.name}</span>}
                                    </button>
                                    <div className={`${isSideBarCollapse ? 'hidden group-hover:flex absolute left-[70px] w-24 h-12 bg-white top-0 justify-start items-center' : 'hidden'}`}>
                                        <span onClick={() => handleNavigate(index)} className='cursor-pointer'>{item.name}</span>
                                    </div>
                                </div>
                            )}
                            {item.subItems && activeSubMenu === index && (
                                <div className={`${isSideBarCollapse ? 'hidden group-hover:block relative w-24 h-auto bg-white' : 'space-y-1'}`}>
                                    {item.subItems.map((subItem, subIndex) => (
                                        <button
                                            key={subIndex}
                                            className={`flex items-center bg-white space-x-2 text-base pl-3 hover:text-blue-400`}
                                            onClick={() => handleNavigate(index, subItem.route, false, true)}
                                        >
                                            {!isSideBarCollapse && subItem.icon} <span>{subItem.name}</span>
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                    );
                })
            }
        </div>
    )
}
export const SideNavCollapseMobile = ({ dataSources }) => {

    console.log(dataSources)
    return (
        <div className='grid grid-cols-3 sm:grid-cols-4  w-full h-full p-10'>
            {
                dataSources.map((dataSource, dataSourceIndex) => (
                    <React.Fragment key={dataSourceIndex}>
                        {dataSource.map((item, index) => (
                            <button key={index} className='flex flex-col justify-center items-center text-xl space-y-1'>
                                {item.icon}
                                <span className='text-base'>{item.name}</span>
                            </button>
                        ))}
                    </React.Fragment>
                ))
            }
        </div>
    );
}

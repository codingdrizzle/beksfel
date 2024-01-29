import React, { useEffect, useState } from 'react'
import Preloader from '../../../commons/Preloader'

const OverviewCard = ({ icon, details, customStyles }) => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (details.value) return setLoading(false)
    }, [details])
    return (
        <div className={`col-span-12 sm:col-span-6 lg:col-span-3 flex justify-center items-center rounded-lg bg-white h-28 space-x-5 ${customStyles || ''}`}>
            {
                loading ?
                    <Preloader /> :
                    (
                        <>
                            <div>{icon}</div>
                            <div className='flex flex-col justify-center items-start'>
                                <span className='text-lg font-black'>{details.value}</span>
                                <span>{details.title}</span>
                            </div>
                        </>
                    )
            }
        </div>
    )
}

export default OverviewCard
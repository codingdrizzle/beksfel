import React from 'react'

const OverviewCard = ({icon, details, customStyles}) => {
  return (
      <div className={`col-span-12 sm:col-span-6 lg:col-span-3 flex justify-center items-center rounded-lg bg-white h-28 space-x-5 ${customStyles || ''}`}>
        <div>{icon}</div>
        <div className='flex flex-col justify-center items-start'>
            <span className='text-lg font-black'>{details.value}</span>
            <span>{details.title}</span>
        </div>
    </div>
  )
}

export default OverviewCard
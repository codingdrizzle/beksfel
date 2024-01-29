import Image from 'next/image'
import React from 'react'
import notFound from '../assets/not-found.png'

const NotFound = () => {
  return (
    <div className='w-full h-full flex justify-center items-center flex-col'>
          <Image src={notFound} alt='not-found' width={150} height={'auto'}/>
          <h1 className='font-medium text-xl'>No Results</h1>
    </div>
  )
}

export default NotFound
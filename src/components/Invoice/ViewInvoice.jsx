import React, { useEffect, useState } from 'react'
import { CgArrowsExchangeV } from 'react-icons/cg'
import { FaCediSign } from 'react-icons/fa6'
import { GoDotFill } from 'react-icons/go'
import { FaUser } from "react-icons/fa";
import { Button } from '../Button';

const ViewInvoice = ({ info, closeModal }) => {
    const [total, setTotal] = useState(0)
    useEffect(() => {
        const gross = info?.items?.reduce((acc, item) => {
            const amount = parseFloat(item.amount) || 0;
            const rate = parseFloat(item.rate) || 0;

            return acc + amount * rate;
        }, 0);
        setTotal(gross)
    }, [info?.items])

    return (
        <div className='my-10'>
            <h2 className='text-3xl font-bold mb-5'>Invoice details</h2>
            <div className='w-full h-auto rounded-lg shadow-md bg-white p-6 mb-5'>
                <div className='w-full grid grid-flow-dense grid-cols-2 sm:grid-cols-3 gap-10 md:grid-cols-5'>
                    <div className='flex flex-col justify-center items-start border-r-0 md:border-r-[1px]'>
                        <h4 className='font-bold whitespace-nowrap'>Invoice No</h4>
                        <p>{info?.invoice_number}</p>
                    </div>
                    <div className='flex flex-col justify-center items-start border-r-0 md:border-r-[1px]'>
                        <h4 className='font-bold whitespace-nowrap'>Date</h4>
                        <p>{info?.date?.split('T')[0]}</p>
                    </div>
                    <div className='flex flex-col justify-center items-start border-r-0 md:border-r-[1px]'>
                        <h4 className='font-bold whitespace-nowrap'>Project name</h4>
                        <p>{info?.project_name || 'N/A'}</p>
                    </div>
                    <div className='flex flex-col justify-center items-start border-r-0 md:border-r-[1px]'>
                        <h4 className='font-bold whitespace-nowrap'>Project location</h4>
                        <p>{info?.project_location || 'N/A'}</p>
                    </div>
                    <div className='flex flex-col justify-center items-start'>
                        <h4 className='font-bold whitespace-nowrap'>Invoice by</h4>
                        <p>{info?.invoice_by || 'N/A'}</p>
                    </div>
                </div>
            </div>
            <div className='w-full grid grid-flow-col-dense grid-cols-11 gap-10 py-4 px-10 my-2 bg-blue-100 rounded-lg text-primaryBlue font-bold'>
                <div className="col-span-1 flex items-center justify-start">
                    <span className='flex justify-center items-center'># <CgArrowsExchangeV size={30} /></span>
                </div>
                <div className="col-span-2 flex items-center justify-start">
                    <span>Description</span>
                </div>
                <div className="col-span-2 flex items-center justify-start">
                    <span>Quantity</span>
                </div>
                <div className="col-span-2 flex items-center justify-start">
                    <span>Unit</span>
                </div>
                <div className="col-span-2 flex items-center justify-start">
                    <span>Rate</span>
                    <span><FaCediSign /></span>
                </div>
                <div className="col-span-2 flex items-center justify-start">
                    <span>Amount</span>
                    <span><FaCediSign /></span>
                </div>
            </div>
            {
                info?.items?.map((item, index) => {
                    return (
                        <div key={index} className='w-full bg-white grid grid-flow-col-dense grid-cols-11 gap-10 py-4 px-10 font-light' style={{ transition: 'all 0.5s ease' }}>
                            <div className="col-span-1 flex items-center justify-start">
                                <span>{'0' + (index + 1)}</span>
                            </div>
                            <div className="col-span-2 flex items-center justify-start">
                                <span className='w-full'>
                                    {item.description}
                                </span>
                            </div>
                            <div className="col-span-2 flex items-center justify-start">
                                <span className='w-full' >
                                    {item.quantity}
                                </span>
                            </div>
                            <div className="col-span-2 flex items-center justify-start">
                                <span className='w-full'>
                                    {item.unit}
                                </span>
                            </div>
                            <div className="col-span-2 flex items-center justify-start">
                                <span className='w-full'>
                                    {item.rate}
                                </span>
                            </div>
                            <div className="col-span-2 flex items-center justify-start">
                                <span className='w-full'>
                                    {item.amount}
                                </span>
                            </div>
                        </div>
                    )
                })
            }
            <div className='grid grid-cols-2 w-full px-10 items-center border-y-2 p-2'>
                {/* Your other content */}
                <strong>Total</strong>
                <div className='flex items-center justify-end'>
                    <strong className='flex items-center min-w-[120px] max-w-max'>
                        {total}
                    </strong>
                </div>
            </div>
            <div className="flex items-center justify-between mt-7">
                <div>
                    <strong>Status</strong>
                    <span className={`flex justify-start items-center space-x-1 ${info?.status === 'approved' ? 'text-green-600' : info?.status === 'rejected' ? 'text-red-600' : 'text-yellow-600'}`}>
                        <GoDotFill /> <span>{info?.status}</span>
                    </span>
                </div>
                <div>
                    <strong>Approved by</strong>
                    <span className='flex justify-start items-center space-x-1'>
                        <FaUser /> <span>{info?.approved_by}</span>
                    </span>
                </div>
            </div>
            <div className='w-full flex justify-center items-center'>
                <button className='border-[1px] border-red-500 bg-red-500 text-white rounded-md w-1/3 p-2' onClick={closeModal}>
                    Close
                </button>
            </div>
        </div>
    )
}

export default ViewInvoice
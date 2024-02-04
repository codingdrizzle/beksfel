import React, { useEffect, useState } from 'react'
import { CgArrowsExchangeV } from 'react-icons/cg'
import { FaCediSign } from 'react-icons/fa6'
import { GoDotFill } from 'react-icons/go'
import { FaUser } from "react-icons/fa";
import { Button } from '../Button';
import Prompt from '../Prompt';
import { EditInvoice } from '../../api'
import { useRouter } from 'next/router';
import { useAtomValue } from 'jotai';
import { authUser } from '../../store';
import { useAlert } from '../../hooks/useCustomAlert';

const ViewInvoice = ({ info, closeModal }) => {
    const {showAlert} = useAlert()

    const [showPrompt, setShowPrompt] = useState(false)
    const [action, setAction] = useState('approval')

    const router = useRouter()
    const user = useAtomValue(authUser)

    const handleApprove = async () => {
        const response = await EditInvoice(info._id, { status: 'approved', approved_by: user.firstname })
        if (response.code === 200) {
            setShowPrompt(false)
            showAlert('Invoice approved successfully', 'success')
            closeModal();
            return router.push('/invoice/all')
        }
        return showAlert('Failed to approve invoice', 'error')
    }
    
    const handleReject = async () => {
        const response = await EditInvoice(info._id, { status: 'rejected', approved_by: user.firstname })
        if (response.code === 200) {
            setShowPrompt(false)
            showAlert('Invoice rejected successfully', 'success')
            closeModal();
            return router.push('/invoice/all')
        }
        return showAlert('Failed to reject invoice', 'error')
    }

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
                <strong>Total</strong>
                <div className='flex items-center justify-end'>
                    <strong className='flex items-center min-w-[120px] max-w-max'>
                        {info?.total}
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
                        <FaUser /> <span>{info?.approved_by || 'N/A'}</span>
                    </span>
                </div>
            </div>

            {
                user.role === 'manager' &&
                <div className='w-full flex justify-center items-center space-x-4'>
                    {
                        (info?.status === 'rejected' || info?.status === 'pending') &&
                        <Button variant={'outline'} theme={'#009c1f'} customClasses='px-16' onClick={() => { setShowPrompt(true); setAction('approval') }}>
                            <span>Approve</span>
                        </Button>
                    }
                    {
                        (info?.status === 'approved' || info?.status === 'pending') &&
                        <Button variant={'fill'} theme={'#ed2005'} customClasses='px-16' onClick={() => { setShowPrompt(true); setAction('rejection') }}>
                            <span>Reject</span>
                        </Button>
                    }
                </div>
            }

            <Prompt isOpen={showPrompt} onClose={() => setShowPrompt(false)}>
                <div>
                    <h1 className='font-normal text-lg'>
                        Are you sure you want to <b>{action === 'approval' ? 'approve' : 'reject'}</b> this invoice?
                    </h1>
                    <div className='flex items-center justify-center space-x-4'>
                        <Button variant={'fill'} theme={'#009c1f'} onClick={() => action === 'approval' ? handleApprove() : handleReject()}>
                            <span>Proceed</span>
                        </Button>
                        <Button variant={'fill'} theme={'#ed2005'} onClick={() => setShowPrompt(false)}>
                            <span>Cancel</span>
                        </Button>

                    </div>
                </div>
            </Prompt>
        </div>
    )
}

export default ViewInvoice
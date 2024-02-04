import React, { useEffect, useState } from 'react'
import { useAtom } from 'jotai'
import { BiEdit } from "react-icons/bi";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { invoiceInfo, invoiceInitialInfo } from '../../store'
import { Button } from '../Button';
import Modal from '../Modal'
import DatePicker from 'react-datepicker'
import { MdDateRange } from "react-icons/md";

const InvoiceInfo = () => {
    const [info, setInfo] = useAtom(invoiceInfo)
    const [showModal, setShowModal] = useState(false)
    
    const generateInvoiceNumber = () => Math.floor(10000 + Math.random() * 90000);
    
    useEffect(() => {
        setInfo(prev => ({ ...prev, invoice_number: generateInvoiceNumber(), date: new Date().toISOString().split('T')[0] }));
    }, [setInfo]);
    
    const handleEditInvoiceInfo = () => {
        setShowModal(true);
    }
    
    const handleModalClose = () => {
        setShowModal(false);
    }

    return (
        <>
            <div className='flex justify-between items-center'>
                <h2 className='text-xl font-bold my-2 ml-1'>Invoice details</h2>
                <Button onClick={handleEditInvoiceInfo}>
                    <BiEdit size={20} />
                    <span>Edit</span>
                </Button>
            </div>
            <div className='w-full h-auto rounded-lg shadow-md bg-white p-6 mb-5'>
                <div className='w-full grid grid-flow-dense grid-cols-2 sm:grid-cols-3 gap-10 md:grid-cols-5'>
                    <div className='flex flex-col justify-center items-start border-r-0 md:border-r-[1px]'>
                        <h4 className='font-bold whitespace-nowrap'>Invoice No</h4>
                        <p>{info.invoice_number}</p>
                    </div>
                    <div className='flex flex-col justify-center items-start border-r-0 md:border-r-[1px]'>
                        <h4 className='font-bold whitespace-nowrap'>Date</h4>
                        <p>{info.date?.split('T')[0]}</p>
                    </div>
                    <div className='flex flex-col justify-center items-start border-r-0 md:border-r-[1px]'>
                        <h4 className='font-bold whitespace-nowrap'>Project name</h4>
                        <p>{info.project_name || 'N/A'}</p>
                    </div>
                    <div className='flex flex-col justify-center items-start border-r-0 md:border-r-[1px]'>
                        <h4 className='font-bold whitespace-nowrap'>Project location</h4>
                        <p>{info.project_location || 'N/A'}</p>
                    </div>
                    <div className='flex flex-col justify-center items-start'>
                        <h4 className='font-bold whitespace-nowrap'>Invoice by</h4>
                        <p>{info.invoice_by || 'N/A'}</p>
                    </div>
                </div>
            </div>
            <Modal isOpen={showModal} onClose={handleModalClose}>
                <div className='flex items-center space-x-2 mb-6 mt-1'>
                    <h2 className='text-2xl font-bold'>Edit Invoice Details </h2>
                    <span className='w-10 h-10 flex items-center justify-center text-2xl bg-green-50 text-green-600 rounded-lg'><BiEdit /></span>
                </div>
                <form className='grid grid-flow-dense grid-cols-6 gap-4 md:gap-7'>
                    <div className='col-span-6 md:col-span-3'>
                        <p className='flex items-center justify-between space-x-1'><span>Invoice number</span><span className='text-xs text-red-400 flex items-center'><HiOutlineExclamationCircle size={15} /> <span>readonly</span></span></p>
                        <input className="w-full h-[40px] m-[6px 0] pl-[15px] text-[13px] tracking-tight outline-none bg-[#ecf0f3] transition-all duration-[0.55s] border-[1px] rounded-md focus:border-[#4B70E2]" type="text" defaultValue={info.invoice_number} disabled />
                    </div>
                    <div className='col-span-6 md:col-span-3'>
                        <p className='flex items-center justify-between space-x-1'>Date</p>
                        <DatePicker value={info.date} customInput className='w-full h-[40px] m-[6px 0] pl-[15px] text-[13px] tracking-tight outline-none bg-[#ecf0f3] transition-all duration-[0.55s] border-[1px] rounded-md focus:border-[#4B70E2]' showIcon icon={<MdDateRange size={35}/>} onChange={(e) => setInfo(prev => ({ ...prev, date: e.toISOString().slice(0, 10) }))} />
                    </div>
                    <div className='col-span-6 md:col-span-3'>
                        <p>Project name</p>
                        <input className="w-full h-[40px] m-[6px 0] pl-[15px] text-[13px] tracking-tight outline-none bg-[#ecf0f3] transition-all duration-[0.55s] border-[1px] rounded-md focus:border-[#4B70E2]" type="text" defaultValue={info.project_name} onChange={(e) => setInfo(prev => ({ ...prev, project_name: e.target.value }))} />
                    </div>
                    <div className='col-span-6 md:col-span-3'>
                        <p>Project location</p>
                        <input className="w-full h-[40px] m-[6px 0] pl-[15px] text-[13px] tracking-tight outline-none bg-[#ecf0f3] transition-all duration-[0.55s] border-[1px] rounded-md focus:border-[#4B70E2]" type="text" defaultValue={info.project_location} onChange={(e) => setInfo(prev => ({ ...prev, project_location: e.target.value }))} />
                    </div>
                    <div className='col-span-6 md:col-span-3'>
                        <p>Invoice by</p>
                        <input className="w-full h-[40px] m-[6px 0] pl-[15px] text-[13px] tracking-tight outline-none bg-[#ecf0f3] transition-all duration-[0.55s] border-[1px] rounded-md focus:border-[#4B70E2]" type="text" defaultValue={info.invoice_by} onChange={(e) => setInfo(prev => ({ ...prev, invoice_by: e.target.value }))} />
                    </div>
                </form>
                <button onClick={() => setShowModal(false)} className='bg-green-500 text-white text-base w-full p-2 mt-4 rounded-lg'>
                    Save Changes
                </button>
            </Modal>
        </>
    )
}

export default InvoiceInfo
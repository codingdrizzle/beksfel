import React, { useCallback, useEffect, useState } from 'react'
import Preloader from '../../../commons/Preloader'
import Input from '../../Input'
import { MdDateRange } from 'react-icons/md'
import DatePicker from 'react-datepicker'
import { CgArrowsExchangeV } from "react-icons/cg";

const ShowInvoice = ({data, loading}) => {
    return (
        loading ? <Preloader /> :
            <div>
                <div className='flex justify-between items-center my-2'>
                    <h1 className='text-lg font-semibold'>Invoice Details</h1>
                </div>
                <div className='bg-blue-400/5 border-[1px] border-gray-400 p-6 rounded-lg'>
                    <div className='grid'>
                        <div className='grid grid-cols-3 gap-4 md:gap-10'>
                            <div className='col-span-3 md:col-span-1'>
                                <span>Invoice Number</span>
                                <Input disabled={true} value={data?.invoice_number} />
                            </div>
                            <div className='col-span-3 md:col-span-1'>
                                <span>Date</span>
                                <DatePicker disabled={true} value={data?.date?.split('T')[0]} className='w-full h-[40px] text-[15px] tracking-tight outline-none bg-transparent transition-all duration-[0.55s] border-[1px] border-gray-400 rounded-md focus:border-[#4B70E2] disabled:cursor-not-allowed' showIcon icon={<MdDateRange size={35} />} />
                            </div>
                            <div className='col-span-3 md:col-span-1'>
                                <span>Invoice By</span>
                                <Input disabled={true} value={data?.invoice_by} />
                            </div>
                        </div>
                        <div className='grid grid-cols-2 gap-4 md:gap-10 mt-4'>
                            <div className='col-span-2 md:col-span-1'>
                                <span>Project Name</span>
                                <Input disabled={true} value={data?.project_name}/>
                            </div>
                            <div className='col-span-2 md:col-span-1'>
                                <span>Project Location</span>
                                <Input disabled={true} value={data?.project_location} />
                            </div>
                        </div>
                    </div>
                    <div className='mt-10'>
                        <div className='overflow-x-auto'>
                            <div className='min-w-full w-max'>
                                <TableHeader />
                                {Array.isArray(data?.items) && data?.items.map((item, index) => <TableRow key={index} unique={index} item={item} />)}
                            </div>
                        </div>
                    </div>
                    <h1 className='my-4 text-lg flex items-center'><b>Total</b> :  GH&#x20B5; {data?.total}</h1>
                </div>
            </div>
    )
}

const TableHeader = () => {
    return (
        <div className='w-full flex p-4 my-2 bg-transparent border-[1px] border-gray-400 rounded-lg font-bold'>
            <div className="flex-[0.05] mr-4 flex items-center justify-start">
                <b className='flex justify-center items-center'># <CgArrowsExchangeV size={30} /></b>
            </div>
            <div className="flex-[0.18] flex items-center justify-start whitespace-nowrap">
                <b>Description</b>
            </div>
            <div className="flex-[0.18] flex items-center justify-start whitespace-nowrap">
                <b>Quantity</b>
            </div>
            <div className="flex-[0.18] flex items-center justify-start whitespace-nowrap">
                <b>Unit</b>
            </div>
            <div className="flex-[0.18] flex items-center justify-start whitespace-nowrap">
                <b>Rate</b>
            </div>
            <div className="flex-[0.18] flex items-center justify-start whitespace-nowrap">
                <b>Amount</b>
            </div>
        </div>
    );
}

const TableRow = ({ item, unique }) => {
    return (
        <div key={1} className='w-full bg-transparent flex px-4 py-2 mb-2 border-[1px] border-gray-400 rounded-lg font-light' style={{ transition: 'all 0.5s ease' }}>
            <div className="flex-[0.05] flex items-center justify-start mr-2">
                <span>{'0' + (unique + 1)}</span>
            </div>
            <div className="flex-[0.18] flex items-center justify-start mr-2">
                <Input type='text' disabled={true} value={item.description} placeholder='Item description' onChange={(e) => handleItemsFieldChange('description', e.target.value)} />
            </div>
            <div className="flex-[0.18] flex items-center justify-start mr-2">
                <Input type='text' disabled={true} value={item.quantity} placeholder='Item quantity' onChange={(e) => handleItemsFieldChange('quantity', e.target.value)} />
            </div>
            <div className="flex-[0.18] flex items-center justify-start mr-2">
                <Input type='text' disabled={true} value={item.unit} placeholder='Item unit' onChange={(e) => handleItemsFieldChange('unit', e.target.value)} />
            </div>
            <div className="flex-[0.18] flex items-center justify-start mr-2">
                <Input type='text' disabled={true} value={item.rate} placeholder='Price rate' onChange={(e) => handleItemsFieldChange('rate', e.target.value)} />
            </div>
            <div className="flex-[0.18] flex items-center justify-start mr-2">
                <Input type='text' disabled value={parseFloat(Number(item.amount))} />
            </div>
        </div>
    )
}

export default ShowInvoice
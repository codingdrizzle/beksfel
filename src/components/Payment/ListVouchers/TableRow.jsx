import React, { useState } from 'react'
import { GoDotFill } from "react-icons/go";
import { useRouter } from 'next/router';
import Link from 'next/link';
import { FaEye } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { useAlert } from '../../../../src/hooks/useCustomAlert'
import { DeletePv } from '../../../api';

const VoucherTableRow = (props) => {
    const { data } = props;
    const {showAlert} = useAlert()

    const handleDelete = async () => {
        const response = await DeletePv(data._id);
        if(response.status === 200){
            showAlert(response.data.message, 'success');
            return window.location.reload();
        }
    }

    return (
        <div className='group w-full bg-white dark:bg-transparent grid grid-cols-5 gap-10 py-4 px-10 dark:text-gray-400 font-light hover:bg-blue-50 dark:hover:bg-darkTheme1' style={{ transition: 'all 0.5s ease' }}>
            <div className="flex items-center justify-start">
                <span>{data.pv_number}</span>
            </div>
            <div className="flex items-center justify-start">
                <span>{data.invoice_id?.project_name}</span>
            </div>
            <div className="flex items-center justify-start">
                <span>{data.invoice_id?.project_location}</span>
            </div>
            <div className="flex items-center justify-between col-span-2 space-x-3">
                <span className={`flex justify-start items-center space-x-1 text-green-600`}>
                    <GoDotFill /> <span>{data.invoice_id?.status}</span>
                </span>
                <div className='flex justify-center items-center space-x-3'>
                    <Link href={`/payments/view-vouchers/${data._id}`} className='w-auto h-auto py-2 rounded-md opacity-0 group-hover:opacity-100 flex justify-center items-center bg-black text-white text-base font-medium px-3 cursor-pointer space-x-2'>
                        <span>View</span>
                        <FaEye size={20} />
                    </Link>
                    <button className='w-auto h-auto py-2 rounded-md opacity-0 group-hover:opacity-100 flex justify-center items-center bg-red-500 text-white text-base font-medium px-3 cursor-pointer space-x-2' onClick={() => handleDelete()}>
                        <span>Delete</span>
                        <MdDelete size={25} />
                    </button>
                </div>
            </div>
        </div>
    )
}

export default VoucherTableRow
import React, { useState } from 'react'
import { GoDotFill } from "react-icons/go";
import { useRouter } from 'next/router';
import Link from 'next/link';

const VoucherTableRow = (props) => {
    const { data } = props;
    const [selectedInvoice, setSelectedInvoice] = useState(null)

    const router = useRouter();

    const handleInvoiceSelect = (id) => {
        setSelectedInvoice(id)
        router.push(`/payments/${id}`);
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
            <div className="flex items-center justify-start space-x-3">
                <span className={`flex justify-start items-center space-x-1 text-green-600`}>
                    <GoDotFill /> <span>{data.invoice_id?.status}</span>
                </span>
                <Link href={`/payments/view-vouchers/${data._id}`} className='w-auto h-auto py-1 rounded-md opacity-0 group-hover:opacity-100 flex justify-center items-center bg-blue-500 text-white text-base font-medium px-3 cursor-pointer'>
                    View
                </Link>
            </div>
        </div>
    )
}

export default VoucherTableRow
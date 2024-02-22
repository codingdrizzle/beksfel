import React, { useState } from 'react'
import { GoDotFill } from "react-icons/go";
import { useRouter } from 'next/router';

const InvoiceTableRow = (props) => {
    const { rowData } = props;
    const [selectedInvoice, setSelectedInvoice] = useState(null)

    const router = useRouter();

    const handleInvoiceSelect = (id) => {
        setSelectedInvoice(id)
        router.push(`/payments/${id}`);
    }

    return (
        <div className='w-full bg-white dark:bg-transparent grid grid-cols-6 gap-10 py-4 px-10 dark:text-gray-400 font-light hover:bg-blue-50 dark:hover:bg-darkTheme1' style={{ transition: 'all 0.5s ease' }}>
            <div className="flex items-center justify-start">
                <span>{rowData.invoice_number}</span>
            </div>
            <div className="flex items-center justify-start">
                <span>{rowData.project_name}</span>
            </div>
            <div className="flex items-center justify-start">
                <span>{rowData.project_location}</span>
            </div>
            <div className="flex items-center justify-start">
                <span>{rowData.invoice_by}</span>
            </div>
            <div className="flex items-center justify-start">
                <span className={`flex justify-start items-center space-x-1 text-green-600`}>
                    <GoDotFill /> <span>{rowData.status}</span>
                </span>
            </div>
            <div className="flex items-center justify-start">
                <input type="radio" name="pv-invoice" onChange={() => handleInvoiceSelect(rowData._id)}>
                    </input>
                {
                    selectedInvoice === rowData._id ?
                        <button className='w-auto h-auto py-1 mx-4 rounded-md flex justify-center items-center bg-blue-500 text-white text-base font-medium px-3 cursor-pointer'>
                            Confirm
                        </button> : null
                }
            </div>
        </div>
    )
}

export default InvoiceTableRow
import React from 'react'
import { BsFillBookmarkStarFill } from "react-icons/bs";
import { CgArrowsExchangeV } from 'react-icons/cg';
import { GoDotFill } from 'react-icons/go';

const TopInvoices = () => {
    const rowData = [
        {
            project_name: 'Project A',
            amount: 5000,
            status: 'approved',
        },
        {
            project_name: 'Project B',
            amount: 8000,
            status: 'rejected',
        },
        {
            project_name: 'Project C',
            amount: 3000,
            status: 'pending',
        },
        // Add more data as needed
    ];

    return (
        <div className='col-span-6 lg:col-span-3 bg-white rounded-lg p-4'>
            <h1 className='flex  items-center space-x-2 font-semibold text-lg mb-3'><BsFillBookmarkStarFill /> <span>Top Valued Invoices</span></h1>
            <div className='overflow-x-auto'>
                <div className='min-w-full w-auto'>
                    <div className='w-full grid grid-cols-6 py-4 px-10 my-2 bg-blue-100 dark:bg-darkTheme1 rounded-lg text-primaryBlue font-bold text-sm'>
                        <div className="col-span-2 flex items-center justify-start">
                            <span className='flex justify-center items-center'># <CgArrowsExchangeV size={30} /></span>
                        </div>
                        <div className="col-span-2 flex items-center justify-start">
                            <span>Project Name</span>
                        </div>
                        <div className="col-span-2 flex items-center justify-start">
                            <span>Amount</span>
                        </div>
                        <div className="col-span-2 flex items-center justify-start">
                            <span>Status</span>
                        </div>
                        <div className="col-span-2 flex items-center justify-start">
                            <span>Actions</span>
                        </div>
                    </div>
                    {
                        rowData.map((item, index) => (
                            <div key={index} className='w-full bg-white dark:bg-transparent grid grid-cols-6 gap-10 py-4 px-10 dark:text-gray-400 font-light hover:bg-blue-50 dark:hover:bg-darkTheme1' style={{ transition: 'all 0.5s ease' }}>
                                <div className="flex items-center justify-start">
                                    <span>{index + 1}</span>
                                </div>
                                <div className="flex items-center justify-start">
                                    <span>{item.project_name}</span>
                                </div>
                                <div className="flex items-center justify-start">
                                    <span>{item.amount}</span>
                                </div>
                                <div className="flex items-center justify-start">
                                    <span className={`flex justify-start items-center space-x-1 ${item.status === 'approved' ? 'text-green-600' : item.status === 'rejected' ? 'text-red-600' : 'text-yellow-600'}`}>
                                        <GoDotFill /> <span>{item.status}</span>
                                    </span>
                                </div>
                                <div className="flex items-center justify-start">
                                    <button className='w-14 h-10 rounded-md flex justify-center items-center bg-green-500 text-white text-base cursor-pointer' onClick={() => onView(index)}>
                                        View
                                    </button>
                                </div>
                            </div>)
                        )}
                </div>
            </div>
        </div>
    );
}

export default TopInvoices
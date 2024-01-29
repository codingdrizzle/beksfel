import React, { useEffect, useState } from 'react'
import { BsFillBookmarkStarFill } from "react-icons/bs";
import { CgArrowsExchangeV } from 'react-icons/cg';
import { GoDotFill } from 'react-icons/go';
import { FaCediSign } from 'react-icons/fa6';
import { FetchInvoicesTop5 } from '../../../api';
import Preloader from '../../../commons/Preloader';
import NotFound from '../../../commons/NotFound';

const TopInvoices = () => {
    const [top5Invoices, setTop5Invoices] = useState([])
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        (async () => {
            const response = await FetchInvoicesTop5();
            if (response.code === 200) {
                setLoading(false)
                return setTop5Invoices(response.data)
            }
        })()
    }, [])

    return (
        <div className='col-span-6 bg-white rounded-lg p-4'>
            {loading && <Preloader/>}
            {top5Invoices.length === 0 && <NotFound />}
            {
                !loading && top5Invoices.length > 0 &&
                (
                    <>
                        <h1 className='flex  items-center space-x-2 font-semibold text-lg mb-3'><BsFillBookmarkStarFill className='text-[25px] text-green-500' /> <span>Top Valued Invoices</span></h1>
                        <div className='overflow-x-auto'>
                            <div className='min-w-full w-max'>
                                <div className='w-full grid grid-cols-8 py-2 gap-10 px-10 my-2 bg-gray-300 rounded-lg text-gray-400 font-bold text-sm'>
                                    <div className="col-span-1 flex items-center justify-start">
                                        <span className='flex justify-center items-center'># <CgArrowsExchangeV size={30} /></span>
                                    </div>
                                    <div className="col-span-3 flex items-center justify-start">
                                        <span>Project Name</span>
                                    </div>
                                    <div className="col-span-2 flex items-center justify-start">
                                        <span>Amount</span>
                                    </div>
                                    <div className="col-span-2 flex items-center justify-start">
                                        <span>Status</span>
                                    </div>
                                </div>
                                {

                                    top5Invoices.map((item, index) => (
                                        <div key={index} className='w-full bg-white dark:bg-transparent grid grid-cols-8 gap-10 py-2 px-10 dark:text-gray-400 font-light hover:bg-blue-50 dark:hover:bg-darkTheme1' style={{ transition: 'all 0.5s ease' }}>
                                            <div className="col-span-1 flex items-center justify-start">
                                                <span>{index + 1}</span>
                                            </div>
                                            <div className="col-span-3 flex items-center justify-start">
                                                <span>{item.project_name}</span>
                                            </div>
                                            <div className="col-span-2 flex items-center justify-start">
                                                <FaCediSign /><span>{item.total}</span>
                                            </div>
                                            <div className="col-span-2 flex items-center justify-start">
                                                <span className={`flex justify-start items-center space-x-1 ${item.status === 'approved' ? 'text-green-600' : item.status === 'rejected' ? 'text-red-600' : 'text-yellow-600'}`}>
                                                    <GoDotFill /> <span>{item.status}</span>
                                                </span>
                                            </div>
                                        </div>)
                                    )}
                            </div>
                        </div>
                    </>
                )}
        </div>
    );
}

export default TopInvoices
import React, { useEffect, useState } from 'react'
import { FiSearch } from 'react-icons/fi';
import Preloader from '../../commons/Preloader';
import NotFound from '../../commons/NotFound';
import { GoDotFill } from 'react-icons/go';
import { FetchAllPvs } from '../../api';
import {exportToExcel} from '../../utils/export-data/export-to-excel'

const Single = () => {
    const [filteredPvs, setFilteredPvs] = useState([]);
    const [searchValue, setSearchValue] = useState('');
    const [pvs, setPvs] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState([])
    
    useEffect(() => {
        (async () => {
            const response = await FetchAllPvs()
            if (response.code === 200) {
                setIsLoading(false)
                setPvs([...response.data])
                setData([...response.data])
            }
        })()
    }, [])
    
    
    const handleSearch = (searchText) => {
        setSearchValue(searchText);
        const filtered = pvs.filter((pv) =>
            Object.values(pv).some((value) =>
                typeof value === 'string' && value.toLowerCase().includes(searchText.toLowerCase())
            )
        );
        setFilteredPvs(filtered);
        setData(filteredPvs.length > 0 ? filteredPvs : pvs)
    };

    const handleExport = (index) => {
        const { invoice_id, ...pvDetails } = data[index]

        delete pvDetails?._id
        delete pvDetails?.__v
        delete pvDetails?.updatedAt
        delete pvDetails?.updatedBy
        delete pvDetails?.createdAt
        pvDetails.date = pvDetails?.date?.split('T')[0]

        delete invoice_id?._id
        delete invoice_id?.__v
        delete invoice_id?.updatedAt
        delete invoice_id?.updatedBy
        delete invoice_id?.createdAt
        delete invoice_id?.created_by
        delete invoice_id?.updated_by
        delete invoice_id?.approved_by
        delete invoice_id?.status
        //invoice_id.date = invoice_id?.date?.split('T')[0]

        const { items, ...restOfInvoiceData } = invoice_id || {};
    const exportData = { pvData: pvDetails, invoiceData: restOfInvoiceData, invoiceItems: invoice_id?.items }
        exportToExcel(exportData, `${restOfInvoiceData?.project_name}.xlsx`)
    }

    return (
        <div className='py-10'>
            <div className="rounded-md flex space-x-2 items-center justify-between">
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-darkThemeTextLight">
                        <FiSearch />
                    </div>
                    <input
                        type="search"
                        id="default-search"
                        value={searchValue}
                        onChange={(e) => handleSearch(e.target.value)}
                        className="block w-full p-2 pl-10 text-sm text-gray-900 border-[1px] border-gray-300 rounded-lg  focus:border-blue-400 focus:border-[1px] focus:outline-none ring-0 focus:ring-0 bg-transparent"
                        placeholder="Search by name/ID"
                    />
                </div>
            </div>
            {
                isLoading ? <Preloader /> : data.length === 0 ? <NotFound /> :
                    <>
                        <span className='my-2 text-base'>Showing <b>{data.length}</b> vouchers</span>
                        <div className='overflow-x-auto'>
                            <div className='min-w-full w-max'>
                                {/*  Table Header */}
                                <div className='min-w-full w-max'>
                                    <div className='w-full grid grid-cols-5 gap-10 py-4 px-10 my-2 bg-blue-100 dark:bg-darkTheme1 rounded-lg text-primaryBlue font-bold'>
                                        <div className="flex items-center justify-start">
                                            <span>Voucher ID</span>
                                        </div>
                                        <div className="flex items-center justify-start">
                                            <span>Project Name</span>
                                        </div>
                                        <div className="flex items-center justify-start">
                                            <span>Project Location</span>
                                        </div>
                                        <div className="flex items-center justify-start">
                                            <span>Status</span>
                                        </div>
                                        <div className="flex items-center justify-start">
                                            <span>Action</span>
                                        </div>
                                    </div>
                                </div>
                                {
                                    data.map((item, index) => {
                                        return (
                                            <div key={1} className='group w-full bg-white dark:bg-transparent grid grid-cols-5 gap-10 py-4 px-10 dark:text-gray-400 font-light hover:bg-blue-50 dark:hover:bg-darkTheme1' style={{ transition: 'all 0.5s ease' }}>
                                                <div className="flex items-center justify-start">
                                                    <span>{item.pv_number}</span>
                                                </div>
                                                <div className="flex items-center justify-start">
                                                    <span>{item.invoice_id?.project_name}</span>
                                                </div>
                                                <div className="flex items-center justify-start">
                                                    <span>{item.invoice_id?.project_location}</span>
                                                </div>
                                                <div className="flex items-center justify-between space-x-3">
                                                    <span className={`flex justify-start items-center space-x-1 text-green-600`}>
                                                        <GoDotFill /> <span>{item.invoice_id?.status}</span>
                                                    </span>
                                                </div>
                                                <div className="flex items-center justify-between space-x-3">
                                                    <div className='flex justify-center items-center space-x-3'>
                                                        <button className='bg-black text-white font-medium py-1 px-2 rounded-md' onClick={() => handleExport(index)}>Export</button>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    }).reverse()
                                }
                            </div>
                        </div>
                    </>
            }
        </div>
    )
}

export default Single
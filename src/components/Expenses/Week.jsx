import React, { useState } from 'react'
import Preloader from '../../commons/Preloader'
import NotFound from '../../commons/NotFound'
import { FaLongArrowAltRight } from "react-icons/fa";
import { MdDateRange } from "react-icons/md";
import DatePicker from 'react-datepicker'
import { useAlert } from '../../hooks/useCustomAlert'
import { FetchRange } from '../../api';
import formatDate from '../../utils/date-formater';
import { bulkExportToExcel } from '../../utils/export-data/bulk-export-to-excel-weekly';

const Week = () => {
    const [pvs, setPvs] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [fromDate, setFromDate] = useState('')
    const [toDate, setToDate] = useState('')
    const [rangeSet, setRangeSet] = useState(false)

    const { showAlert } = useAlert()

    function checkWeek(startDate, endDate) {
        const oneDay = 24 * 60 * 60 * 1000;

        const diffDays = Math.round((endDate - startDate) / oneDay) + 1;
        if (diffDays > 7) {
            showAlert('Date range is more than a week', 'error')
            return false
        } else if (diffDays < 7) {
            showAlert('Date range is less than a week', 'error')
            return false
        } else {
            return diffDays === 7;
        }
    }

    const handleQuery = async () => {
        const isWeek = checkWeek(new Date(fromDate), new Date(toDate))
        if (isWeek) {
            setRangeSet(true)
            const response = await FetchRange({ startDate: fromDate, endDate: toDate })
            setPvs([...response.data])
            setIsLoading(false)
        }
    }

    const handleExport = () => {
        bulkExportToExcel(pvs, `Week Report(${formatDate(fromDate)} - to - ${formatDate(toDate)}).xlsx`, `${formatDate(fromDate)} - to - ${formatDate(toDate)}`)
    }

    return (
        <div className='md:mt-24'>
            <div className='flex justify-center items-center space-x-10'>
                <div>
                    <h1>From</h1>
                    <DatePicker value={fromDate} placeholderText='Start date' className='w-auto h-[40px] text-[13px] tracking-tight outline-none bg-[#ecf0f3] transition-all duration-[0.55s] border-[1px] rounded-md focus:border-[#4B70E2]' showIcon icon={<MdDateRange size={35} />} onChange={(e) => setFromDate(e.toISOString().slice(0, 10))} />
                </div>
                <div>
                    <h1>&nbsp;</h1>
                    <FaLongArrowAltRight size={30} />
                </div>
                <div>
                    <h1>To</h1>
                    <DatePicker value={toDate} placeholderText='End date' className='w-auto h-[40px] text-[13px] tracking-tight outline-none bg-[#ecf0f3] transition-all duration-[0.55s] border-[1px] rounded-md focus:border-[#4B70E2]' showIcon icon={<MdDateRange size={35} />} onChange={(e) => setToDate(e.toISOString().slice(0, 10))} />
                </div>
                {

                    (fromDate != '' && toDate != '') &&
                    <div>
                        <h1>&nbsp;</h1>
                        <button className='bg-black text-white w-24 py-2 font-medium rounded-lg hover:scale-[1.03] transition-transform duration-300' onClick={handleQuery}>Query</button>
                    </div>
                }
            </div>
            {

                (fromDate === '' || toDate === '') && <NotSetup />
            }

            {
                rangeSet &&
                <div className='py-10'>
                    {
                        pvs.length >= 0 &&
                        <div className='flex justify-between items-center'>
                            <div>
                                <span><b>{pvs.length}</b> Total</span>
                                <div className='flex flex-col'>
                                    <span><b>From</b> {formatDate(fromDate)}</span>
                                    <span><b>To</b> {formatDate(toDate)}</span>
                                </div>
                            </div>
                            <div className='flex flex-col justify-center items-end'>
                                <button className='bg-black text-white w-fit px-4 py-2 font-medium rounded-lg hover:scale-[1.03] transition-transform duration-300' onClick={handleExport}>Bulk Export</button>
                                <span className='my-2 text-base'>Export data from <b>{pvs.length}</b> voucher(s)</span>
                            </div>
                        </div>
                    }
                    {
                        isLoading ? <Preloader /> : pvs.length === 0 ? <NotFound /> :

                            <div className='overflow-x-auto'>
                                <div className='min-w-full w-max'>
                                    {/*  Table Header */}
                                    <div className='min-w-full w-max'>
                                        <div className='w-full grid grid-cols-3 gap-10 py-4 px-10 my-2 bg-blue-100 dark:bg-darkTheme1 rounded-lg text-primaryBlue font-bold'>
                                            <div className="flex items-center justify-start">
                                                <span>Voucher ID</span>
                                            </div>
                                            <div className="flex items-center justify-start">
                                                <span>Project Name</span>
                                            </div>
                                            <div className="flex items-center justify-start">
                                                <span>Date</span>
                                            </div>
                                        </div>
                                    </div>
                                    {
                                        pvs.map((item, index) => {
                                            return (
                                                <div key={1} className='group w-full bg-white dark:bg-transparent grid grid-cols-3 gap-10 py-4 px-10 dark:text-gray-400 font-light hover:bg-blue-50 dark:hover:bg-darkTheme1' style={{ transition: 'all 0.5s ease' }}>
                                                    <div className="flex items-center justify-start">
                                                        <span>{item.pv_number}</span>
                                                    </div>
                                                    <div className="flex items-center justify-start">
                                                        <span>{item.invoice_id?.project_name}</span>
                                                    </div>
                                                    <div className="flex items-center justify-start">
                                                        <span>{item.invoice_id?.createdAt.split('T')[0]}</span>
                                                    </div>

                                                </div>
                                            )
                                        }).reverse()
                                    }
                                </div>
                            </div>

                    }
                </div>
            }
        </div >
    )
}

import Image from 'next/image';
import setup from '../../assets/setup.svg'

const NotSetup = () => {
    return (
        <div className='flex justify-center items-center flex-col absolute top-[50%] left-[50%] transform -translate-x-[50%] -translate-y-[50%]'>
            <h1 className='text-center font-medium text-lg'>Date range not set <br /> Let&apos;s do it now</h1>
            <Image src={setup} width={300} height={'auto'} alt='no-setup' />
        </div>
    )
}
export default Week
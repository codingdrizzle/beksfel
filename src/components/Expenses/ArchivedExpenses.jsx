import React, { useEffect, useState } from 'react'
import { useAlert } from '../../hooks/useCustomAlert'
import { FetchRange } from '../../api';
import { bulkExportToExcel } from '../../utils/export-data/bulk-export-to-excel';
import { ModalLoader } from '../Modal'
import { FaDownload } from "react-icons/fa";


const ArchiveExpenses = () => {
    const [showLoader, setShowLoader] = useState(false);
    const [years, setYears] = useState([])
    const [monthYear, setMonthYear] = useState('')
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
    const currentYear = new Date().getFullYear();
    const startYear = 2024;

    const { showAlert } = useAlert()

    const handleExport = async () => {
        setShowLoader(true)
        const months = {
            "January": "01", "February": "02", "March": "03", "April": "04", "May": "05", "June": "06",
            "July": "07", "August": "08", "September": "09", "October": "10", "November": "11", "December": "12"
        };

        const monthNumber = months[monthYear.split(',')[0]];
        const year = monthYear.split(',')[1].trim();

        const response = await FetchRange({ monthYear: `${monthNumber}/${year}` });
        if (response.code === 200) {
            setShowLoader(false)
            if (response.data.length === 0) {
                setMonthYear('')
                return showAlert(`No data to export for ${monthYear.split(',')[0]}`, 'error')
            }
            return bulkExportToExcel(response.data, `${monthYear.split(',')[0]}-${selectedYear}.xlsx`, `${monthYear.split(',')[0]}-${selectedYear}`)
        }

    }

    useEffect(() => {
        const yearsArray = [];
        for (let i = parseInt(startYear); i <= parseInt(currentYear); i++) {
            yearsArray.push(i);
        }
        setYears(yearsArray);
    }, [currentYear])


    const handleClick = (month) => {
        setMonthYear(`${month}, ${selectedYear}`)
    }

    return (
        <>
            <div className='md:mt-24 md:px-10'>
                <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5 my-10 justify-center place-items-start'>
                    {
                        years.map((item, index) => {
                            return (
                                <button key={index} className='group relative col-span-1 w-full min-w-[100px] max-w-[250px] h-[80px] rounded-xl bg-white shadow flex justify-center items-center p-5 space-x-2 cursor-default'>
                                    <h1 className='font-medium text-lg'>{item}</h1>
                                    <span className='hidden group-hover:flex absolute right-7 cursor-pointer w-8 h-8 rounded-lg bg-gray-400 text-white justify-center items-center' onClick={() => setSelectedYear(item)}>
                                        <FaDownload size={15} />
                                    </span>
                                </button>)
                        })
                    }

                </div>
            </div >
            <ModalLoader isOpen={showLoader} />
        </>
    )
}

export default ArchiveExpenses
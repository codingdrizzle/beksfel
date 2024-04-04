import React, { useEffect, useState } from 'react'
import { useAlert } from '../../hooks/useCustomAlert'
import { FetchRange } from '../../api';
import { bulkExportToExcel } from '../../utils/export-data/bulk-export-to-excel';
import { FaCheckCircle } from "react-icons/fa";
import { FaFileExport } from "react-icons/fa";
import { ModalLoader } from '../../components/Modal'

const ExportExpenses = () => {
    const [showLoader, setShowLoader] = useState(false);
    const [years, setYears] = useState([])
    const [months, setMonths] = useState([])
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
        function getAllMonths(year) {
            const currentDate = new Date();
            const currentYear = currentDate.getFullYear();
            const currentMonth = currentDate.getMonth() + 1;
            const calcMonths = [];

            if (year > currentYear) {
                return calcMonths;
            }

            const endMonth = (year === currentYear) ? currentMonth : 12;

            for (let month = 1; month <= endMonth; month++) {
                calcMonths.push(getMonthName(month));
            }

            return setMonths(calcMonths);
        }
        getAllMonths(selectedYear)

        function getMonthName(month) {
            const months = [
                "January", "February", "March", "April", "May", "June",
                "July", "August", "September", "October", "November", "December"
            ];
            return months[month - 1];
        }

    }, [selectedYear])

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
                <div className='flex justify-between'>
                    <select
                        value={selectedYear}
                        className="bg-transparent px-3 py-2 text-sm text-gray-900 border-[1px] border-gray-300 rounded-lg  focus:border-blue-400 focus:border-[1px] focus:outline-none"
                        onChange={(e) => setSelectedYear(parseInt(e.target.value))}
                    >
                        <option value="default" hidden>Filter by</option>
                        {years.map((item, index) => (
                            <option key={index} value={item}> {item} </option>
                        ))}
                    </select>
                    {
                        monthYear &&
                        <button className='px-3 py-2 rounded-lg  flex justify-center items-center bg-black text-white text-base font-medium cursor-pointer space-x-2' onClick={handleExport}>
                            <span>Export</span>
                            <FaFileExport size={20} />
                        </button>
                    }
                </div>
                <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5 my-10 justify-center place-items-start'>
                    {
                        months.map((month, index) => {
                            return (
                                <button key={index} className='relative col-span-1 w-full min-w-[100px] max-w-[250px] h-[80px] rounded-xl bg-white shadow flex justify-center items-center p-5 space-x-2 cursor-pointer transition-all duration-300 group hover:scale-[1.03]' onClick={() => handleClick(month)}>
                                    <h1 className='font-medium text-lg'>{month}</h1>
                                    <span className=''></span>
                                    {
                                        monthYear.includes(month) &&
                                        <FaCheckCircle className='text-green-400 text-2xl absolute -top-2 -right-2' />
                                    }
                                </button>)
                        })
                    }

                </div>
            </div >
            <ModalLoader isOpen={showLoader} />
        </>
    )
}

export default ExportExpenses
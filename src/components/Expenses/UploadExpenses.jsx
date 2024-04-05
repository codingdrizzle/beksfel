import React, { useEffect, useState } from 'react'
import Preloader from '../../commons/Preloader'
import NotFound from '../../commons/NotFound'
import { FaLongArrowAltRight } from "react-icons/fa";
import { MdDateRange } from "react-icons/md";
import DatePicker from 'react-datepicker'
import { useAlert } from '../../hooks/useCustomAlert'
import { CreateExpenses, FetchRange } from '../../api';
import formatDate from '../../utils/date-formater';
import { bulkExportToExcel } from '../../utils/export-data/bulk-export-to-excel';
import { FaRegFileAlt } from "react-icons/fa";
import extractExcelData from '../../utils/export-data/extract-data-from-excel'
import Loader from '../../commons/Loader'
import { useRouter } from 'next/router';

const UploadExpenses = ({ closeMe }) => {
    const [isDragging, setIsDragging] = useState(false);
    const [file, setFile] = useState(null);
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
    const [years, setYears] = useState([])
    const [showLoader, setShowLoader] = useState(false)
    const currentYear = new Date().getFullYear();
    const startYear = 2024;

    const { showAlert } = useAlert()

    useEffect(() => {
        const yearsArray = [];
        for (let i = parseInt(startYear); i <= parseInt(currentYear); i++) {
            yearsArray.push(i);
        }
        setYears(yearsArray);
    }, [currentYear])


    const handleDragEnter = (event) => {
        event.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = (event) => {
        event.preventDefault();
        setIsDragging(false);
    };

    const handleDrop = (event) => {
        event.preventDefault();
        setIsDragging(false);
        const files = event.dataTransfer.files;
        handleFiles(files);
    };

    const handleFileChange = (event) => {
        const files = event.target.files;
        handleFiles(files);
    };

    const handleFiles = (files) => {
        setFile(files[0])
    };

    const handleUpload = async () => {
        const parts = file.name.split('.');
        const extension = parts[parts.length - 1];

        const allowedExtensions = ['xlsx', 'xls'];
        if (allowedExtensions.includes(extension.toLowerCase())) {
            setShowLoader(true)
            const excelData = await extractExcelData(file);

            const response = await CreateExpenses({ year: selectedYear, fileData: excelData });
            if (response.code === 201) {
                setShowLoader(false)
                showAlert('Expenses uploaded successfully', 'success')
                return closeMe()
            }
            showAlert(response.message, 'error')
        }
    }

    return (
        <>
            <div className="flex justify-center items-center h-screen">
                {
                    file != null ? <div className='relative py-10 flex flex-col space-y-3'>
                        <div className='flex justify-between items-center mb-10'>
                            <h1>Expenses for the year </h1>
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
                        </div>
                        <div className='flex items-center space-x-1 border-[1px] p-5 border-dashed rounded-lg border-gray-400'>
                            <FaRegFileAlt size={30} /> <h1 className='text-xl'>{file.name}</h1>
                        </div>
                        <div className='flex flex-col justify-center space-x-1 border-[1px] py-1 px-5 border-dashed rounded-lg border-gray-400'>
                            <b>Last updated</b>
                            <p>{new Date(file.lastModified).toLocaleString()}</p>
                        </div>
                        <button className='px-5 py-3 rounded-lg  flex justify-center items-center bg-black text-white text-base font-medium cursor-pointer space-x-2' onClick={handleUpload}>
                            {
                            showLoader ? <Loader/> :
                                <span>Upload File</span>
                            }
                        </button>

                        <button className='absolute bottom-0 left-0 border-[1px] p-1 rounded-md' onClick={() => setFile(null)}>
                            <span>Choose new file</span>
                        </button>
                    </div> :
                        <div
                            className={`border-2 border-dashed w-[80%] h-[80%] rounded-lg p-10 flex justify-center items-center text-center ${isDragging ? 'border-purple-600' : 'border-gray-300'
                                }`}
                            onDragOver={handleDragEnter}
                            onDragEnter={handleDragEnter}
                            onDragLeave={handleDragLeave}
                            onDrop={handleDrop}
                        >
                            <label htmlFor="fileInput" className="cursor-pointer">
                                <p>Drag & Drop files here</p>
                                <p>or</p>
                                <p className="text-purple-600">Click to select files</p>
                            </label>
                            <input
                                id="fileInput"
                                type="file"
                                className="hidden"
                                onChange={handleFileChange}
                                multiple
                                accept=".xlsx"
                            />
                        </div>
                }
            </div >
\        </>
    )
}

export default UploadExpenses
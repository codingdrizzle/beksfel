import React from 'react'
import { BiEdit } from "react-icons/bi";
import { MdOutlineDelete } from "react-icons/md";
import { GoDotFill } from "react-icons/go";

const InvoiceTableRow = (props) => {
    const {rowData, onView, viewMode, editMode, key} = props;
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
              <span className={`flex justify-start items-center space-x-1 ${rowData.status === 'approved' ? 'text-green-600' : rowData.status === 'rejected' ? 'text-red-600' : 'text-yellow-600'}`}>
                  <GoDotFill /> <span>{rowData.status}</span>
              </span>
          </div>
          <div className="flex items-center justify-start">
              {viewMode && <button className='w-14 h-10 rounded-md flex justify-center items-center bg-green-500 text-white text-base cursor-pointer' onClick={() => onView(key)}>
                  View
              </button>}
              {
                  editMode &&
                  <div className='flex justify-start items-center space-x-3'>
                      <span className='w-10 h-10 rounded-md flex justify-center items-center bg-blue-50 text-blue-600 text-xl cursor-pointer'>
                          <BiEdit />
                      </span>
                      <span className='w-10 h-10 rounded-md flex justify-center items-center bg-red-50 text-red-600 text-xl cursor-pointer'>
                          <MdOutlineDelete />
                      </span>
                  </div>
              }
          </div>
      </div>
  )
}

export default InvoiceTableRow
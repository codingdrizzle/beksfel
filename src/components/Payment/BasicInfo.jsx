import React from 'react'
import DatePicker from 'react-datepicker'
import Input from '../Input'
import { MdDateRange } from 'react-icons/md'

const BasicInfo = ({pV}) => {
    return (
        <div className='flex justify-between mt-5 space-x-2'>
            <div className='flex-1 md:flex-[0.3]'>
                <span className='font-medium my-1 block whitespace-nowrap'>Payment Voucher Number</span>
                <Input disabled={true} value={pV.pv_number} />
            </div>
            <div className='flex-1 md:flex-[0.3]'>
                <span className='font-medium my-1 block'>Date</span>
                <DatePicker disabled value={pV.date} className='w-full h-[40px] text-[15px] tracking-tight outline-none bg-[#ecf0f3] transition-all duration-[0.55s] border-[1px] border-gray-400 rounded-md focus:border-[#4B70E2] disabled:cursor-not-allowed' showIcon icon={<MdDateRange size={35} />} onChange={(e) => setPv(prev => ({ ...prev, date: e.toISOString().slice(0, 10) }))} />
            </div>
        </div>
    )
}

export default BasicInfo
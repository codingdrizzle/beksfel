import React, { useEffect, useState } from 'react'
import { useAtom } from 'jotai'
import DatePicker from 'react-datepicker'
import Input from '../Input'
import { pv } from '../../store'
import { MdDateRange } from 'react-icons/md'

const BasicInfo = () => {

    const [pV, setPv] = useAtom(pv);

    const generatePvNumber = () => Math.floor(10000 + Math.random() * 90000);

    useEffect(() => {
        setPv(prev => ({ ...prev, pv_number: generatePvNumber(), date: new Date().toISOString().split('T')[0] }));
    }, [setPv])

    const handleFieldChange = (field, value) => {
        setPv((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    return (
        <>
            <div className='flex justify-between mt-5 space-x-2'>
                <div className='flex-1 md:flex-[0.3]'>
                    <span className='font-medium my-1 block whitespace-nowrap'>Payment Voucher Number</span>
                    <Input disabled={true} value={pV.pv_number} />
                </div>
                <div className='flex-1 md:flex-[0.3]'>
                    <span className='font-medium my-1 block'>Date</span>
                    <DatePicker value={pV.date} className='w-full h-[40px] text-[15px] tracking-tight outline-none bg-[#ecf0f3] transition-all duration-[0.55s] border-[1px] border-gray-400 rounded-md focus:border-[#4B70E2]' showIcon icon={<MdDateRange size={35} />} onChange={(e) => setPv(prev => ({ ...prev, date: e.toISOString().slice(0, 10) }))} />
                    {/*<Input>
                  </Input>*/}
                </div>
            </div>
            <Input placeholder='Name' value={pV.name} onChange={(e) => handleFieldChange('name', e.target.value)} />
            <Input placeholder='Allocation (Purpose)' value={pV.allocation} onChange />
        </>
    )
}

export default BasicInfo
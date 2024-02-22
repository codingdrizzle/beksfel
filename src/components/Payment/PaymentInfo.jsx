import React, { useEffect } from 'react'
import { useAtom } from 'jotai'
import Input from '../Input'
import { pv } from '../../store'

const PaymentInfo = () => {

    const [pV, setPv] = useAtom(pv);

    const handleFieldChange = (field, value) => {
        setPv((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    return (
        <>
            <div className='flex justify-between items-center flex-wrap space-x-2'>
                <div className='flex-1 md:flex-[0.2] bg-transparent border-[1px] border-gray-400 focus:border-blue-400 focus:outline-none w-full px-3 py-2 rounded-lg cursor-pointer'>
                    <select name="payment_type" id="payment_type" className='bg-transparent w-full focus:outline-none h-full  cursor-pointer' onChange={(e) => handleFieldChange('payment_type', e.target.value)}>
                        <option hidden>Payment Type</option>
                        <option value="cash">Cash</option>
                        <option value="bank">Bank</option>
                    </select>
                </div>
                <div className='flex-1 md:flex-[0.6]'>
                    {pV.payment_type && <Input placeholder={pV.payment_type === 'cash' ? 'Enter bank account number' : 'Enter cheque number'} value={pV.payment_type === 'cash' ? pV.bank_name : pV.cheque_number} onChange={(e) => handleFieldChange(pV.payment_type === 'cash' ? 'bank_name' : 'cheque_number', e.target.value)} />}
                </div>
            </div>
            <div className='flex justify-between items-center flex-wrap space-x-2'>
                <div className='flex-1 sm:flex-[0.4] md:flex-[0.2]'>
                    <Input placeholder={'Gross amount'} value={pV.gross_amount} onChange={(e) => handleFieldChange('gross_amount', e.target.value)} />
                </div>
                <div className='flex-1 sm:flex-[0.4] md:flex-[0.2]'>
                    <Input placeholder={'Net amount'} value={pV.net_amount} onChange={(e) => handleFieldChange('net_amount', e.target.value)} />
                </div>
                <div className='flex-1 sm:flex-[0.4] md:flex-[0.2] bg-transparent border-[1px] border-gray-400 focus:border-blue-400 focus:outline-none w-full px-3 py-2 rounded-lg cursor-pointer'>
                    <select name="payment_type" id="payment_type" className='bg-transparent w-full focus:outline-none h-full  cursor-pointer' onChange={(e) => handleFieldChange('payment_type', e.target.value)}>
                        <option hidden>Tax</option>
                        <option value="3%">Good - 3%</option>
                        <option value="5%">Work - 5%</option>
                        <option value="7%">Service - 7%</option>
                    </select>
                </div>
            </div>
            <div className='flex justify-between items-center flex-wrap space-x-2'>
                <div className='flex-1 md:flex-[0.4]'>
                    <Input placeholder={'TIN number'} value={pV.tin_number} onChange={(e) => handleFieldChange('tin_number', e.target.value)} />
                </div>
                <div className='flex-1 md:flex-[0.4]'>
                    <Input placeholder={'Balance'} value={pV.balance} onChange={(e) => handleFieldChange('balance', e.target.value)} />
                </div>
            </div>
        </>
    )
}

export default PaymentInfo
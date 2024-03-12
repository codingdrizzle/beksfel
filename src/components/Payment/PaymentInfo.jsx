import React from 'react'
import { useAtom } from 'jotai'
import Input from '../Input'
import { pv } from '../../store'
import { FaSquareCheck } from "react-icons/fa6";

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
            <div className='grid grid-cols-7 gap-6'>
                <div className='col-span-7 grid grid-cols-8 md:grid-cols-7 gap-6'>
                    <div className={` bg-transparent border-[1px] border-gray-400 focus:border-blue-400 focus:outline-none px-3 py-2 rounded-lg cursor-pointer ${pV.payment_type === 'Cash' ? 'col-span-8 md:col-span-3' : 'col-span-8 sm:col-span-4 md:col-span-1'}`}>
                        <select name="payment_type" id="payment_type" className='bg-transparent w-full focus:outline-none h-full  cursor-pointer' onChange={(e) => handleFieldChange('payment_type', e.target.value)}>
                            <option hidden>Payment Type</option>
                            <option value="Cash">Cash</option>
                            <option value="Bank">Bank</option>
                        </select>
                    </div>
                    {
                        pV.payment_type === 'Bank' &&
                        <>
                            < div className='col-span-8 sm:col-span-4 md:col-span-2'>
                                <Input placeholder={'Bank name'} value={pV.bank_name} onChange={(e) => handleFieldChange('bank_name', e.target.value)} />
                            </div>
                            < div className='col-span-8 sm:col-span-4 md:col-span-2'>
                                <Input disabled={pV.bank_name.length < 1} placeholder={'Bank account number'} value={pV.bank_account_number} onChange={(e) => handleFieldChange('bank_account_number', e.target.value)} />
                            </div>
                            < div className='col-span-8 sm:col-span-4 md:col-span-2'>
                                <Input disabled={pV.bank_account_number.length < 1} placeholder={'Cheque number'} value={pV.cheque_number} onChange={(e) => handleFieldChange('cheque_number', e.target.value)} />
                            </div>
                        </>
                    }
                    <div className={`${pV.payment_type === 'Cash' ? 'col-span-8 md:col-span-4' : 'col-span-8'}`}>
                        <Input placeholder={'TIN number'} value={pV.tin_number} onChange={(e) => handleFieldChange('tin_number', e.target.value)} />
                    </div>
                </div>
            </div >
            <div className='grid grid-cols-8 gap-4'>
                <div className='col-span-8 xs:col-span-4 '>
                    <Input placeholder={'Gross amount'} value={pV.gross_amount} onChange={(e) => handleFieldChange('gross_amount', e.target.value)} />
                </div>
                <div className='col-span-8 xs:col-span-4 '>
                    <Input placeholder={'Net amount'} value={pV.net_amount} onChange={(e) => handleFieldChange('net_amount', e.target.value)} />
                </div>
                <div className='col-span-8 xs:col-span-4 '>
                    <Input placeholder={'Amount Received'} value={pV.amount_received} onChange={(e) => handleFieldChange('amount_received', e.target.value)} />
                </div>
                <div className='col-span-8 xs:col-span-4 '>
                    <Input placeholder={'Balance'} value={pV.balance} onChange={(e) => handleFieldChange('balance', e.target.value)} />
                </div>
            </div>
            <h1 className='text-lg'>Tax Applied</h1>
            <div className='w-full md:w-fit'>
                <Input placeholder={'Tax amount'} value={isNaN(parseFloat(pV.tax_amount)) ? '' : parseFloat(pV.tax_amount)} onChange={(e) => handleFieldChange('tax_amount', parseFloat(e.target.value))} />
            </div>
            <div className='flex flex-col md:flex-row justify-start items-center space-y-3 md:space-x-6 md:space-y-0'>
                <button className='w-full md:w-auto md:min-w-[150px] rounded-lg border-[1px] bg-green-50/50 border-green-500 text-green-500 p-2 flex items-center justify-center space-x-3 transition duration-300 hover:scale-[1.03] cursor-pointer' onClick={() => handleFieldChange('tax_percent', '3%')}>
                    <span className='text-[17px]'>Good - 3%</span>
                    {
                        pV.tax_percent === '3%' ?
                            <FaSquareCheck size={20} /> :
                            <span className='w-5 h-5 bg-transparent border-[1px] rounded-sm cursor-pointer'></span>
                    }
                </button>
                <button className='w-full md:w-auto md:min-w-[150px] rounded-lg border-[1px] bg-yellow-50/50 border-yellow-500 text-yellow-500 p-2 flex items-center justify-center space-x-3 transition duration-300 hover:scale-[1.03] cursor-pointer' onClick={() => handleFieldChange('tax_percent', '5%')}>
                    <span className='text-[17px]'>Work - 5%</span>
                    {
                        pV.tax_percent === '5%' ?
                            <FaSquareCheck size={20} /> :
                            <span className='w-5 h-5 bg-transparent border-[1px] rounded-sm cursor-pointer'></span>
                    }
                </button>
                <button className='w-full md:w-auto md:min-w-[150px] rounded-lg border-[1px] bg-red-50/50 border-red-500 text-red-500 p-2 flex items-center justify-center space-x-3 transition duration-300 hover:scale-[1.03] cursor-pointer' onClick={() => handleFieldChange('tax_percent', '7%')}>
                    <span className='text-[17px]'>Service 7%</span>
                    {
                        pV.tax_percent === '7%' ?
                            <FaSquareCheck size={20} /> :
                            <span className='w-5 h-5 bg-transparent border-[1px] rounded-sm cursor-pointer'></span>
                    }
                </button>
            </div>
        </>
    )
}

export default PaymentInfo
import React from 'react'
import Input from '../../Input'
import { FaSquareCheck } from "react-icons/fa6";

const PaymentInfo = ({ pV }) => {
    return (
        <>
            <div className='grid grid-cols-7 flex-wrap gap-4 lg:gap-20 my-8'>
                <div className='col-span-7 lg:col-span-5 flex flex-col sm:flex-row items-center space-y-4 sm:space-x-5 sm:space-y-0'>
                    <div className='w-auto sm:w-1/2 lg:w-auto'>
                        <span className='block my-1 '>Payment type</span>
                        <Input disabled={true} value={pV.payment_type} />
                    </div>
                    {
                        pV.payment_type === 'bank' &&
                        <>
                            < div className='w-full sm:w-1/2 lg:w-full'>
                                <span className='block my-1 '>Bank Account Number</span>
                                <Input disabled={true} value={pV.bank_name} />
                            </div>
                            <div className='w-full sm:w-1/2 lg:w-full'>
                                <span className='block my-1 '>Cheque Number</span>
                                <Input disabled={true} value={pV.cheque_number} />
                            </div>
                        </>
                    }
                </div>
                <div className='col-span-7 lg:col-span-2'>
                    <span className='block my-1 '>Tin Number</span>
                    <Input value={pV.tin_number} />
                </div>
            </div >
            <div className='grid grid-cols-8 gap-4 md:gap-6 lg:gap-20'>
                <div className='col-span-8 sm:col-span-4 md:col-span-2 '>
                    <span className='block my-1 '>Gross amount</span>
                    <Input value={pV.gross_amount} />
                </div>
                <div className='col-span-8 sm:col-span-4 md:col-span-2 '>
                    <span className='block my-1 '>Net amount</span>
                    <Input value={pV.net_amount} />
                </div>
                <div className='col-span-8 sm:col-span-4 md:col-span-2 '>
                    <span className='block my-1 '>Amount received</span>
                    <Input value={pV.amount_received} />
                </div>
                <div className='col-span-8 sm:col-span-4 md:col-span-2 '>
                    <span className='block my-1 '>Balance</span>
                    <Input value={pV.balance} />
                </div>
            </div>
            <span className='block my-1 '>Tax applied</span>
            <div className='flex flex-col md:flex-row justify-start items-center space-y-3 md:space-x-6 md:space-y-0'>
                {
                    pV.tax === '3%' &&
                    <button className='w-full md:w-auto md:min-w-[150px] rounded-lg border-[1px] bg-green-50/50 border-green-500 text-green-500 p-2 flex items-center justify-center space-x-3 transition duration-300 hover:scale-[1.03] cursor-pointer' onClick={() => handleFieldChange('tax', '3%')}>
                        <span className='text-[17px]'>Good - 3%</span>
                        <FaSquareCheck size={20} />
                    </button>
                }
                {
                    pV.tax === '5%' &&
                    <button className='w-full md:w-auto md:min-w-[150px] rounded-lg border-[1px] bg-yellow-50/50 border-yellow-500 text-yellow-500 p-2 flex items-center justify-center space-x-3 transition duration-300 hover:scale-[1.03] cursor-pointer' onClick={() => handleFieldChange('tax', '5%')}>
                        <span className='text-[17px]'>Work - 5%</span>
                        <FaSquareCheck size={20} />
                    </button>
                }
                {
                    pV.tax === '7%' &&
                    <button className='w-full md:w-auto md:min-w-[150px] rounded-lg border-[1px] bg-red-50/50 border-red-500 text-red-500 p-2 flex items-center justify-center space-x-3 transition duration-300 hover:scale-[1.03] cursor-pointer' onClick={() => handleFieldChange('tax', '7%')}>
                        <span className='text-[17px]'>Service 7%</span>
                        <FaSquareCheck size={20} />
                    </button>
                }
            </div>
        </>
    )
}

export default PaymentInfo
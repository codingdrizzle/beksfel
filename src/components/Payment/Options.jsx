import React, { useState } from 'react'
import { SiCashapp } from "react-icons/si";
import { MdPayments } from "react-icons/md";
import { GiReceiveMoney, GiPayMoney } from "react-icons/gi";
import Modal from '../Modal'
import ListInvoices from '../../../src/components/Payment/ListInvoices'
import Link from 'next/link';

const Options = () => {
    const [showInvoices, setShowInvoices] = useState(false)
    return (
        <>
            <div className='grid grid-cols-2 md:grid-cols-4 gap-5 my-10'>
                <div className='m-auto w-[auto] md:w-[200px] h-[auto] md:h-[200px] rounded-xl bg-white flex flex-col justify-center items-center p-7 space-y-5 cursor-pointer transition-all duration-300 group hover:scale-[1.04]' onClick={() => setShowInvoices(true)}>
                    <SiCashapp className='text-[50px] group-hover:text-blue-400  transition-all duration-300' />
                    <h1 className='text-center font-medium'>New Payment Voucher</h1>
                </div>
                <Link href={'/payments/view-vouchers'} className='m-auto w-[auto] md:w-[200px] h-[auto] md:h-[200px] rounded-xl bg-white flex flex-col justify-center items-center p-7 space-y-5 cursor-pointer transition-all duration-300 group hover:scale-[1.04]'>
                    <MdPayments className='text-[50px] group-hover:text-blue-400  transition-all duration-300' />
                    <h1 className='text-center font-medium'>View Payment Vouchers</h1>
                </Link>
                <Link href={'/payments/expenses'} className='m-auto w-[auto] md:w-[200px] h-[auto] md:h-[200px] rounded-xl bg-white flex flex-col justify-center items-center p-7 space-y-5 cursor-pointer transition-all duration-300 group hover:scale-[1.04]'>
                    <GiPayMoney className='text-[50px] group-hover:text-blue-400  transition-all duration-300' />
                    <h1 className='text-center font-medium'>Expenses</h1>
                </Link>
                <Link href={'/payments/income'} className='m-auto w-[auto] md:w-[200px] h-[auto] md:h-[200px] rounded-xl bg-white flex flex-col justify-center items-center p-7 space-y-5 cursor-pointer transition-all duration-300 group hover:scale-[1.04]'>
                    <GiReceiveMoney className='text-[50px] group-hover:text-blue-400  transition-all duration-300' />
                    <h1 className='text-center font-medium'>Income</h1>
                </Link>
            </div>
            <Modal isOpen={showInvoices} onClose={() => setShowInvoices(false)}>
                <ListInvoices/>
            </Modal>
        </>
    )
}

export default Options
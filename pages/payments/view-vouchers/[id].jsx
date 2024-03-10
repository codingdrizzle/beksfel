import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { FaPrint } from "react-icons/fa6";
import { BiSolidFileExport } from "react-icons/bi";
import BasicInfo from '../../../src/components/Payment/ViewVouchers/BasicInfo'
import Layout from '../../../src/components/Layout'
import { FetchPv } from '../../../src/api'
import ShowInvoice from '../../../src/components/Payment/ViewVouchers/ShowInvoice'
import PaymentInfo from '../../../src/components/Payment/ViewVouchers/PaymentInfo'
import { Button } from '../../../src/components/Button';
import {exportToExcel} from '../../../src/utils/export-to-excel'
import Back from '../../../src/commons/Back';

const Voucher = () => {
    const [pv, setPv] = useState({})
    const params = useRouter()

    useEffect(() => {
        (async () => {
            const { id } = params.query;
            const response = await FetchPv(id)
            if (response.code === 200) {
                setPv(response.data)
            }
            console.log(response)
        })()
    }, [params.query])

    return (
        <Layout>
            <Back to={'/payments/view-vouchers'} />
            <div className='my-10'>
                <div className='flex justify-between items-center space-x-3 border-b-[1px] border-gray-300'>
                    <Button theme={'#000'} variant={'outline'} className='print:hidden' onClick={() => window.print()}>
                        <FaPrint />
                        <span>Print</span>
                    </Button>
                    <Button theme={'#3786FB'} variant={'outline'} className='print:hidden' onClick={() => exportToExcel([ w])}>
                        <BiSolidFileExport />
                        <span>Export to file</span>
                    </Button>
                </div>
                <BasicInfo pV={pv} />
                <ShowInvoice data={pv.invoice_id} />
                <PaymentInfo pV={pv} />
            </div>
        </Layout>
    )
}

export default Voucher
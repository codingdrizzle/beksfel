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
import { exportToExcel } from '../../../src/utils/export-data/export-to-excel'
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
        })()
    }, [params.query])

    const { invoice_id, ...pvDetails } = pv

    delete pvDetails?._id
    delete pvDetails?.__v
    delete pvDetails?.updatedAt
    delete pvDetails?.updatedBy
    delete pvDetails?.createdAt
    pvDetails.date = pvDetails?.date?.split('T')[0]
    
    delete invoice_id?._id
    delete invoice_id?.__v
    delete invoice_id?.updatedAt
    delete invoice_id?.updatedBy
    delete invoice_id?.createdAt
    delete invoice_id?.created_by
    delete invoice_id?.updated_by
    delete invoice_id?.approved_by
    delete invoice_id?.status
    //invoice_id.date = invoice_id?.date?.split('T')[0]

    const { items, ...restOfInvoiceData } = invoice_id || {};

    const exportData = { pvData: pvDetails, invoiceData: restOfInvoiceData, invoiceItems: invoice_id?.items }

    return (
        <Layout>
            <Back to={'/payments/view-vouchers'} />
            <div className='my-10'>
                <div className='flex justify-end items-center space-x-3 border-b-[1px] border-gray-300'>
                    {/*<Button theme={'#000'} variant={'outline'} className='print:hidden' onClick={() => window.print()}>
                        <FaPrint />
                        <span>Print</span>
                    </Button>*/}
                    <Button theme={'#3786FB'} variant={'outline'} className='print:hidden' onClick={() => exportToExcel(exportData, `${restOfInvoiceData?.project_name}.xlsx`)}>
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
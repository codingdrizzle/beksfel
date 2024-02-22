import React from 'react'
import TableHeader from './TableHeader'
import InvoiceTableRow from './TableRow';
import { useRouter } from 'next/router';

const InvoiceTable = (props) => {
    const router = useRouter();

    return (
            <div className='overflow-x-auto'>
                <div className='min-w-full w-max'>
                    <TableHeader />
                    {
                        props.invoices.map((item, index) => {
                            return (
                                <InvoiceTableRow key={index} index={index} rowData={item} viewMode={true} />
                            )
                        })
                    }
                </div>
            </div>
    )
}

export default InvoiceTable
import React from 'react'
import InvoiceTable from './InvoiceTable'
import Preloader from '../../commons/Preloader'

const MyInvoices = ({ data }) => {
    return (
        data.length < 1 ? <Preloader/> :
            <InvoiceTable viewMode={true} invoices={data} />

    )
}

export default MyInvoices
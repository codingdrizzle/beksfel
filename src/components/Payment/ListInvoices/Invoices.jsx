import React from 'react'
import InvoiceTable from './InvoiceTable'
import Preloader from '../../../commons/Preloader'

const Invoices = ({ data }) => {
    return (
        data.length < 1 ? <Preloader /> :
            <>
                <span className='my-2 text-base'>Showing <b>{data.length}</b> approved invoices</span>
                <InvoiceTable viewMode={true} invoices={data} />
            </>

    )
}

export default Invoices
import React from 'react'
import InvoiceTable from './InvoiceTable'
import Preloader from '../../commons/Preloader'
import NotFound from '../../commons/NotFound'


const Invoices = ({ data }) => {
    return (
        data.length <= 1 ? <NotFound/> : !data ? <Preloader /> :
            <>
                <span className='my-2 text-base'>Showing <b>{data.length}</b> invoices</span>
                <InvoiceTable viewMode={true} invoices={data} />
            </>

    )
}

export default Invoices
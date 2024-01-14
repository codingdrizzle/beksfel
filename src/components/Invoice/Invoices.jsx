import React, { useEffect, useState } from 'react'
import InvoiceTable from './InvoiceTable'
import Preloader from '../../commons/Preloader'

const Invoices = ({ data }) => {
    return (
        data.length < 1 ? <Preloader/> :
            <InvoiceTable viewMode={true} invoices={data} />

    )
}

export default Invoices
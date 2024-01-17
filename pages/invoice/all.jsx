import React, { useEffect, useState } from 'react'
import Invoices from '../../src/components/Invoice/Invoices'
import Invoice from '.'
import { useAtomValue } from 'jotai'
import { authUser } from '../../src/store'
import { FindAllInvoices } from '../../src/api'

const AllInvoices = () => {
    const [invoices, setInvoices] = useState([])

    useEffect(() => {
        (async () => {
            let response;
            response = await FindAllInvoices()

            if (response.code === 200) return setInvoices([...response.data]);
            return showAlert(response.message, 'error');
        })()
    }, [])
    return (
        <Invoice>
            <Invoices data={invoices} />
        </Invoice>
    )
}

export default AllInvoices;
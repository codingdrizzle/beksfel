import React, { useEffect, useState } from 'react'
import MyInvoices from '../../src/components/Invoice/Invoices'
import Invoice from '.'
import { useAtomValue } from 'jotai'
import { authUser } from '../../src/store'
import { FindAllInvoicesByUser } from '../../src/api'

const MineInvoices = () => {
    const user = useAtomValue(authUser);
    const [invoices, setInvoices] = useState([])

    useEffect(() => {
        (async () => {
            let response;
            response = await FindAllInvoicesByUser(user._id)

            if (response.code === 200) return setInvoices([...response.data]);
            return showAlert(response.message, 'error');

        })()
    }, [user._id])

    return (
        <Invoice>
            <MyInvoices data={invoices} />
        </Invoice>
    )
}

export default MineInvoices;
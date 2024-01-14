import React, { useEffect, useState } from 'react'
import { useAtom } from 'jotai'
import { FaPlus } from "react-icons/fa6";
import Layout from '../../src/components/Layout'
import InvoiceItemsTable from '../../src/components/Invoice/InvoiceItemsTable'
import { Button } from '../../src/components/Button'
import { invoiceInitialItem, invoiceItems } from '../../src/store'
import InvoiceInfo from '../../src/components/Invoice/InvoiceInfo'

const CreateInvoice = () => {
    const [items, setItems] = useAtom(invoiceItems)
    const [total, setTotal] = useState(0)

    const handleAddItem = () => {
        setItems(oldItems => [...oldItems, { ...invoiceInitialItem }])
    }

    useEffect(() => {
        const gross = items.reduce((acc, item) => {
            const amount = parseFloat(item.amount) || 0;
            const rate = parseFloat(item.rate) || 0;

            return acc + amount * rate;
        }, 0);
        setTotal(gross)
    }, [items])

    return (
        <Layout>
            <InvoiceInfo />
            <InvoiceItemsTable />
            <div>
{total}
            </div>
            <Button type={'fill'} themeColor={'green'} onClick={handleAddItem}>
                <FaPlus />
                Add Item
            </Button>
        </Layout>
    )
}

export default CreateInvoice
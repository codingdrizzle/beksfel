import React, { useEffect, useState } from 'react'
import { useAtom, useAtomValue } from 'jotai'
import { FaPlus } from "react-icons/fa6";
import Layout from '../../src/components/Layout'
import InvoiceItemsTable from '../../src/components/Invoice/InvoiceItemsTable'
import { Button } from '../../src/components/Button'
import { invoiceInfo, invoiceInitialItem, invoiceItems, authUser } from '../../src/store'
import InvoiceInfo from '../../src/components/Invoice/InvoiceInfo'
import { MdDelete } from 'react-icons/md';
import { FaSave } from 'react-icons/fa';
import { validateInput } from '../../src/utils/input-validator/validator'
import { InvoiceSchema } from '../../src/utils/input-validator'
import { useAlert } from '../../src/hooks/useCustomAlert';
import { CreateNewInvoice } from '../../src/api/index'
import { useRouter } from 'next/router';

const CreateInvoice = () => {
    const [items, setItems] = useAtom(invoiceItems)
    const [invoiceDetails] = useAtom(invoiceInfo)
    const [total, setTotal] = useState(0)
    const { showAlert } = useAlert()
    const router = useRouter()

    const handleAddItem = () => {
        setItems(oldItems => [...oldItems, { ...invoiceInitialItem }])
    }

    useEffect(() => {
        const gross = items.reduce((acc, item) => {
            const amount = parseFloat(item.amount) || 0;
            return acc + amount;
        }, 0);
        setTotal(prev => gross)
    }, [items])

    const user = useAtomValue(authUser);

    const handleSubmit = async () => {
        const invoice = {
            items: [...items],
            ...invoiceDetails,
            total: total,
            status: 'pending',
            created_by: user._id
        }

        const errorMessage = validateInput(InvoiceSchema, invoice);

        if (errorMessage) return showAlert(errorMessage, 'error')
        else {
            const response = await CreateNewInvoice(invoice)
            if (response.code === 201) {
                showAlert(response.message, 'success')
                return router.push('/invoice/me')
            }
            return showAlert(response.message, 'error');
        }
    }

    return (
        <Layout>
            <InvoiceInfo />
            <InvoiceItemsTable>
                <div className='w-full bg-white grid grid-flow-col-dense grid-cols-13 gap-10 py-4 px-10 font-light' style={{ transition: 'all 0.5s ease' }}>
                    <div className='col-span-3 flex items-center justify-start'></div>
                    <div className='col-span-1 flex items-center justify-start font-black space-x-3 pl-20 text-2xl'>
                        <h1>Total :</h1>
                        <span>{total}</span>
                    </div>
                </div>
            </InvoiceItemsTable>
            <div className='flex justify-between items-center w-full my-6'>
                <Button variant={'outline'} theme={'#000'} onClick={handleAddItem}>
                    <FaPlus />
                    <span>Add Item</span>
                </Button>
                <div className='flex justify-center items-center space-x-4'>
                    <Button variant={'fill'} theme={'#4BB543'} onClick={handleSubmit}>
                        <FaSave />
                        <span>Submit Invoice</span>
                    </Button>
                    <Button variant={'outline'} theme={'#ed2005'} onClick={() => router.push('/invoice/me')}>
                        <MdDelete size={20} />
                        <span>Discard Invoice</span>
                    </Button>
                </div>
            </div>
        </Layout>
    )
}

export default CreateInvoice
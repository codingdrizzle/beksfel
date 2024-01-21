import React, { useState } from 'react'
import TableHeader from './InvoiceTableHeader'
import Modal from '../Modal'
import InvoiceTableRow from './InvoiceTableRow';
import ViewInvoice from './ViewInvoice';

const InvoiceTable = (props) => {
    const [invoiceView, setInvoiceView] = useState(false);
    const [invoiceIndex, setInvoiceIndex] = useState(null);

    const handleInvoiceView = (index) => {
        setInvoiceIndex(index)
        setInvoiceView(prev => !prev)
    }
    return (
        <>
            <div className='overflow-x-auto'>
                <div className='min-w-full w-max'>
                    <TableHeader />
                    {
                        props.invoices.map((item, index) => {
                            return (
                                <InvoiceTableRow key={index} index={index} rowData={item} viewMode={true} onView={() => handleInvoiceView(index)} />
                            )
                        })
                    }
                </div>
            </div>
            <Modal isOpen={invoiceView} onClose={() => setInvoiceView(prev => !prev)}>
                <ViewInvoice info={props.invoices[invoiceIndex]} closeModal={() => setInvoiceView(prev => !prev)} />
            </Modal>
        </>
    )
}

export default InvoiceTable
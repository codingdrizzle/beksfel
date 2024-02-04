import React from 'react'
import InvoiceItem from './InvoiceItem';
import { invoiceItems } from '../../store';
import { useAtom } from 'jotai';
import ItemsHeader from './InvoiceItemsHeader';

const InvoiceItemsTable = (props) => {
    const [items,] = useAtom(invoiceItems)

    return (
        <>
            <h2 className='text-xl font-bold my-2 ml-1'>Invoice items</h2>
            <div className='overflow-x-auto'>
                <div className='min-w-full w-max'>
                    <ItemsHeader />
                    {
                        items.map((item, index) => {
                            return (
                                <InvoiceItem key={index} index={index} item={item} viewMode={false} />
                            )
                        })
                    }
            {props.children}
                </div>
            </div>
        </>
    )
}

export default InvoiceItemsTable
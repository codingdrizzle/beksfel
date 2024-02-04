import React, { useCallback, useEffect, useState } from 'react'
import { BiEdit } from "react-icons/bi";
import { MdOutlineDelete } from "react-icons/md";
import { FaSave } from "react-icons/fa";
import { useAtom } from 'jotai';
import { invoiceItems } from '../../store';

const InvoiceItem = (props) => {
    const { item, index, viewMode } = props;

    const [items, setItems] = useAtom(invoiceItems);

    const [isEditMode, setIsEditMode] = useState(viewMode);
    const [isLastItem, setIsLastItem] = useState(index === (items.length - 1));

    const handleFieldChange = useCallback((field, value) => {
        setItems((prev) =>
            prev.map((item, key) =>
                key === index ? { ...item, [field]: value } : item
            )
        );
    }, [index, setItems]);

    const handleRemoveItem = (index) => {
        if (items.length === 1) {
            return;
        } else {
            return setItems((prev) => prev.filter((_, i) => i !== index));
        }
    };

    useEffect(() => {
        setIsEditMode((prev) => items.length !== prev);
    }, [items.length]);

    useEffect(() => {
        handleFieldChange('amount', Number(item.rate) * Number(item.quantity))
    }, [handleFieldChange, item.quantity, item.rate])

    return (
        <div className='w-full bg-white grid grid-flow-col-dense grid-cols-13 gap-10 py-4 px-10 font-light' style={{ transition: 'all 0.5s ease' }}>
            <div className="col-span-1 flex items-center justify-start">
                <span>{'0' + (index + 1)}</span>
            </div>
            <div className="col-span-2 flex items-center justify-start">
                <input type='text' disabled={!isLastItem ? !isLastItem : isEditMode} defaultValue={item.description} placeholder='Item description' className='w-full h-full px-4 rounded-md focus:outline-none bg-slate-50 disabled:bg-transparent' onChange={(e) => handleFieldChange('description', e.target.value)} />
            </div>
            <div className="col-span-2 flex items-center justify-start">
                <input type='text' disabled={!isLastItem ? !isLastItem : isEditMode} defaultValue={item.quantity} placeholder='Item quantity' className='w-full h-full px-4 rounded-md focus:outline-none bg-slate-50 disabled:bg-transparent' onChange={(e) => handleFieldChange('quantity', e.target.value)} />
            </div>
            <div className="col-span-2 flex items-center justify-start">
                <input type='text' disabled={!isLastItem ? !isLastItem : isEditMode} defaultValue={item.unit} placeholder='Item unit' className='w-full h-full px-4 rounded-md focus:outline-none bg-slate-50 disabled:bg-transparent' onChange={(e) => handleFieldChange('unit', e.target.value)} />
            </div>
            <div className="col-span-2 flex items-center justify-start">
                <input type='text' disabled={!isLastItem ? !isLastItem : isEditMode} defaultValue={item.rate} placeholder='Price rate' className='w-full h-full px-4 rounded-md focus:outline-none bg-slate-50 disabled:bg-transparent' onChange={(e) => handleFieldChange('rate', e.target.value)} />
            </div>
            <div className="col-span-2 flex items-center justify-start">
                <input type='text' disabled defaultValue={item.amount} className='w-full h-full px-4 rounded-md focus:outline-none bg-slate-50 disabled:bg-transparent' />
            </div>
            <div className="col-span-2 flex items-center justify-start space-x-3">
                {(!isLastItem ? !isLastItem : isEditMode) ?
                    <button className='w-10 h-10 rounded-md flex justify-center items-center bg-blue-50 text-blue-600 text-xl cursor-pointer' onClick={() => {
                        if (!isLastItem) setIsLastItem(true);
                        else setIsEditMode(false);
                    }}>
                        <BiEdit />
                    </button> :
                    <button className='w-10 h-10 rounded-md flex justify-center items-center bg-green-50 text-green-600 text-xl cursor-pointer' onClick={() => isLastItem ? setIsLastItem(!isLastItem) : setIsEditMode(!isEditMode)}>
                        <FaSave />
                    </button>
                }
                {
                    items.length >= 2 &&
                    <button className='w-10 h-10 rounded-md flex justify-center items-center bg-red-50 text-red-600 text-xl cursor-pointer' onClick={() => handleRemoveItem(index)}>
                        <MdOutlineDelete />
                    </button>
                }
            </div>
        </div>
    )
}

export default InvoiceItem;
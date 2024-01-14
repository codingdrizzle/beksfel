import React from 'react';
import { CgArrowsExchangeV } from "react-icons/cg";
import { FaCediSign } from 'react-icons/fa6';

const ItemsHeader = () => {
    return (
            <div className='w-full grid grid-flow-col-dense grid-cols-13 gap-10 py-4 px-10 my-2 bg-blue-100 rounded-lg text-primaryBlue font-bold'>
                <div className="col-span-1 flex items-center justify-start">
                    <span className='flex justify-center items-center'># <CgArrowsExchangeV size={30} /></span>
                </div>
                <div className="col-span-2 flex items-center justify-start">
                    <span>Description</span>
                </div>
                <div className="col-span-2 flex items-center justify-start">
                    <span>Quantity</span>
                </div>
                <div className="col-span-2 flex items-center justify-start">
                    <span>Unit</span>
                </div>
                <div className="col-span-2 flex items-center justify-start">
                    <span>Rate</span>
                    <span><FaCediSign /></span>
                </div>
                <div className="col-span-2 flex items-center justify-start">
                    <span>Amount</span>
                    <span><FaCediSign /></span>
                </div>
                <div className="col-span-2 flex items-center justify-start">
                    <span>Actions</span>
                </div>
            </div>
    );
};

export default ItemsHeader;
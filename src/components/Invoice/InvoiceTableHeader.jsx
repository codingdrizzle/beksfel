import React from 'react';

const TableHeader = () => {
    return (
        <div className='min-w-full w-max'>
            <div className='w-full grid grid-cols-6 gap-10 py-4 px-10 my-2 bg-blue-100 dark:bg-darkTheme1 rounded-lg text-primaryBlue font-bold'>
                <div className="flex items-center justify-start">
                    <span>ID</span>
                </div>
                <div className="flex items-center justify-start">
                    <span>Project Name</span>
                </div>
                <div className="flex items-center justify-start">
                    <span>Project Location</span>
                </div>
                <div className="flex items-center justify-start">
                    <span>Invoiced By</span>
                </div>
                <div className="flex items-center justify-start">
                    <span>Status</span>
                </div>
                <div className="flex items-center justify-start">
                    <span>Actions</span>
                </div>
            </div>
        </div>
    );
};

export default TableHeader;
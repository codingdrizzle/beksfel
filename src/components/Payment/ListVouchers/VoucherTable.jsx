import React from 'react'
import TableHeader from './TableHeader'
import VoucherTableRow from './TableRow';
import { useRouter } from 'next/router';

const VoucherTable = (props) => {
    return (
            <div className='overflow-x-auto'>
                <div className='min-w-full w-max'>
                    <TableHeader />
                    {
                        props.vouchers.map((item, index) => {
                            return (
                                <VoucherTableRow key={index} index={index} data={item} viewMode={true} />
                            )
                        })
                    }
                </div>
            </div>
    )
}

export default VoucherTable
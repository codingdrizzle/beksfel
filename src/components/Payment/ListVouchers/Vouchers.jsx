import React from 'react'
import VoucherTable from './VoucherTable'
import Preloader from '../../../commons/Preloader'

const Vouchers = ({ data }) => {
    return (
        data.length < 1 ? <Preloader /> :
            <>
                <span className='my-2 text-base'>Showing <b>{data.length}</b> vouchers</span>
                <VoucherTable viewMode={true} vouchers={data} />
            </>

    )
}

export default Vouchers
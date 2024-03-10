import React from 'react'
import VoucherTable from './VoucherTable'
import Preloader from '../../../commons/Preloader'
import NotFound from '../../../commons/NotFound'

const Vouchers = ({ data, isLoading }) => {
    return (
        isLoading ? <Preloader /> : data.length === 0 ? <NotFound /> :
            <>
                <span className='my-2 text-base'>Showing <b>{data.length}</b> vouchers</span>
                <VoucherTable viewMode={true} vouchers={data} />
            </>

    )
}

export default Vouchers
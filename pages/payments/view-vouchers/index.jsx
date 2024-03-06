import React, { useEffect, useState } from 'react'
import Layout from '../../../src/components/Layout'
import { FetchAllPvs } from '../../../src/api'
import ListVouchers from '../../../src/components/Payment/ListVouchers'

const ViewVouchers = () => {
    const [pvs, setPvs] = useState([])
    useEffect(() => {
        (async () => {
            const response = await FetchAllPvs()
            if (response.code === 200) {
                setPvs([...response.data])
            }
            console.log(pvs)
        })()
    }, [])
    return (
        <Layout>
            <ListVouchers pvs={pvs} />
        </Layout>
    )
}

export default ViewVouchers
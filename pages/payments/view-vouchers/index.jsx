import React, { useEffect, useState } from 'react'
import Layout from '../../../src/components/Layout'
import { FetchAllPvs } from '../../../src/api'
import ListVouchers from '../../../src/components/Payment/ListVouchers'
import Back from '../../../src/commons/Back'

const ViewVouchers = () => {
    const [pvs, setPvs] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        (async () => {
            const response = await FetchAllPvs()
            if (response.code === 200) {
                setIsLoading(false)
                setPvs([...response.data])
            }
        })()
    }, [])

    return (
        <Layout>
            <Back to={'/payments'} />
            <ListVouchers pvs={pvs} isLoading={isLoading} />
        </Layout>
    )
}

export default ViewVouchers
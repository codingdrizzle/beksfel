import React from 'react'
import Layout from '../../src/components/Layout'
import { Button } from '../../src/components/Button'
import { useRouter } from 'next/router'
import Back from '../../src/commons/Back'

const Expenses = () => {
    const router = useRouter()
    
    return (
        <Layout>
            <Back to = { '/payments'} />         
            <Button theme={'black'} variant={'fill'} onClick={() => router.push('create-Expenses')}>
                Create Expenses
            </Button>
        </Layout>
    )
}

export default Expenses
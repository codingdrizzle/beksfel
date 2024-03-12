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
            <h1 className='font-bold text-3xl'>
                Hold on for a while... <br />
                All will be ready in the next push 🫥 🫥
            </h1>
        </Layout>
    )
}

export default Expenses
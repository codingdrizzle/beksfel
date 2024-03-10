import React, { useState } from 'react'
import DatePicker from 'react-datepicker'
import { MdDateRange } from 'react-icons/md'
import Layout from '../../src/components/Layout'
import Input from '../../src/components/Input'
import { Button } from '../../src/components/Button'
import { CreateNewIncome } from '../../src/api'
import Back from '../../src/commons/Back'
import { useAlert } from '../../src/hooks/useCustomAlert'
import { useRouter } from 'next/router'
import {IncomeSchema} from '../../src/utils/input-validator'
import {validateInput} from '../../src/utils/input-validator/validator'

const CreateIncome = () => {
    const [siteName, setSiteName] = useState('');
    const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
    const [amount, setAmount] = useState(0);
    const { showAlert } = useAlert()
    const router = useRouter()

    const handleCreateIncome = async () => {
        const errorMessage = validateInput(IncomeSchema, {siteName, date, amount})
        if(errorMessage) return showAlert(errorMessage, 'error')
        const response = await CreateNewIncome({ site_name: siteName, date, amount })
        if (response.code === 201) {
            showAlert(response.message, 'success');
            return router.push('/payments/income');
        }
        showAlert(response.message, 'error');
    }

    return (
        <Layout>
            <div className='my-6'>
                <Back to={'/payments/income'} />
                <h1 className='text-2xl font-semibold'>Create new income</h1>
                <h1 className='my-3'>Fill out the form below.</h1>
                <form className='w-96 max-w-full space-y-4' onSubmit={(e) => e.preventDefault()}>
                    <div>
                        <span className='block my-1'>Site name</span>
                        <Input placeholder='Eg: Site name' value={siteName} onChange={(e) => setSiteName(e.target.value)} />
                    </div>
                    <div>
                        <span className='block my-1'>Date</span>
                        <DatePicker value={date} className='w-full h-[40px] text-[15px] tracking-tight outline-none bg-[#ecf0f3] transition-all duration-[0.55s] border-[1px] border-gray-400 rounded-md focus:border-[#4B70E2] disabled:cursor-not-allowed' showIcon icon={<MdDateRange size={35} />} onChange={(e) => setDate(e.toISOString().slice(0, 10))} />
                    </div>
                    <div>
                        <span className='block my-1'>Amount</span>
                        <Input placeholder='Amount' value={isNaN(parseFloat(amount)) ? 0 : parseFloat(amount)} onChange={(e) => setAmount(e.target.value)} />
                    </div>
                    <div className='w-full flex justify-center items-center'>

                        <Button theme={'black'} variant={'fill'} customClasses={'w-full'} onClick={handleCreateIncome}>
                            <span className='block text-center w-full'>Submit Income</span>
                        </Button>
                    </div>
                </form>
            </div>
        </Layout>
    )
}

export default CreateIncome
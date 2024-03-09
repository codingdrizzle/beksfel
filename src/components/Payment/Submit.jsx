import React from 'react'
import { Button } from '../Button'
import { validateInput } from '../../utils/input-validator/validator'
import { PaymentSchema, InvoiceSchema } from '../../utils/input-validator'
import { useAtom } from 'jotai'
import { pv, pvInit, invoiceInfo, invoiceItems, invoiceInitialInfo, invoiceInitialItem } from '../../store'
import { CreatePv } from '../../api'
import { useAlert } from '../../hooks/useCustomAlert'
import { useRouter } from 'next/router'

const Submit = ({ actualInvoice, storeInvoice }) => {
    const [pV, setPv] = useAtom(pv);
    const [, setInvoiceInfo] = useAtom(invoiceInfo);
    const [, setInvoiceItems] = useAtom(invoiceItems);

    const { showAlert } = useAlert()

    const router = useRouter()


    function deepEqual(obj1, obj2) {
        if (obj1 === obj2) {
            return true;
        }

        if (typeof obj1 !== 'object' || obj1 === null || typeof obj2 !== 'object' || obj2 === null) {
            return false;
        }

        const keys1 = Object.keys(obj1);
        const keys2 = Object.keys(obj2);

        if (keys1.length !== keys2.length) {
            return false;
        }

        for (const key of keys1) {
            if (!keys2.includes(key) || !deepEqual(obj1[key], obj2[key])) {
                return false;
            }
        }

        return true;
    }
    
    const handleSubmitCheck = async () => {
        let pvValidationError = validateInput(PaymentSchema, { ...pV })
        let invoiceValidationError = validateInput(InvoiceSchema, storeInvoice)

        if (pvValidationError) return showAlert(pvValidationError, 'error')
        if (invoiceValidationError) return showAlert(invoiceValidationError, 'error')

        const { _id, __v, updatedAt, createdAt, ...restOfFilteredInvoice } = storeInvoice

        const invoice = deepEqual(actualInvoice, storeInvoice) ? {} : restOfFilteredInvoice

        console.log({ ...pV, invoice: invoice })
        const response = await CreatePv({ ...pV, invoice: invoice });
        
        if (response.code === 200) {
            //setPv(pvInit)
            //setInvoiceInfo(invoiceInitialInfo)
            //setInvoiceItems(invoiceInitialItem)
            //router.push('/payments')
            //return showAlert(response.message, 'success')
        }
        return showAlert(response.message, 'error')
    }

    return (
        <div className='flex justify-center'>
            <Button customClasses={'min-w-full md:min-w-[30%]'} onClick={handleSubmitCheck}>
                <span className='block w-full'>Submit</span>
            </Button>
        </div>
    )
}

export default Submit
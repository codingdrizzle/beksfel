import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router';
import Layout from '../../src/components/Layout';
import BasicInfo from '../../src/components/Payment/BasicInfo'
import PaymentInfo from '../../src/components/Payment/PaymentInfo'
import { FindOneInvoice } from '../../src/api';
import { useAlert } from '../../src/hooks/useCustomAlert';
import ShowInvoice from '../../src/components/Payment/ShowInvoice';
import Submit from '../../src/components/Payment/Submit';
import { useAtom } from 'jotai'
import { invoiceInfo, invoiceItems,pv } from '../../src/store'


const CreatePv = () => {
    const [invoice, setInvoice] = useState({})
    const { showAlert } = useAlert();
    const [loading, setLoading] = useState(true)
    const [invInfo, setInvInfo] = useAtom(invoiceInfo)
    const [invItems, setInvItems] = useAtom(invoiceItems)
    const [pV, setPv] = useAtom(pv);
    
    const router = useRouter();
    useEffect(() => {
        const { id } = router.query;
        (async () => {
            const generatePvNumber = () => Math.floor(10000 + Math.random() * 90000);
            const response = await FindOneInvoice(id)
            if (response.code === 200) {
                setLoading(false)
                setPv(prev => ({ ...prev, pv_number: generatePvNumber(), date: new Date().toISOString().split('T')[0], invoice_id: id }));
                return setInvoice(response.data);
            }
        })()
    }, [showAlert, router.query, setPv])

    useEffect(() => {
        const { items, ...restOfInvoice } = invoice;
        setInvInfo(() => ({ ...restOfInvoice }));
        setInvItems(items);
    }, [invoice, setInvInfo, setInvItems])

    useEffect(() => {
        const gross = Array.isArray(invItems) && invItems.reduce((acc, item) => {
            const amount = parseFloat(item.amount) || 0;
            return acc + amount;
        }, 0);
        setInvItems(prev => ({ ...prev, total: gross }))
    }, [setInvItems])

    return (
        <Layout>
            <div className='w-[90%] md:w-[85%] m-auto flex flex-col gap-8'>
                <BasicInfo pV={pV} />
                <ShowInvoice invoice={invoice} loading={loading} invInfo={invInfo} invItems={invItems} setInvInfo={setInvInfo} setInvItems={setInvItems}/>
                <PaymentInfo/>
                <Submit actualInvoice={invoice} storeInvoice={{items: invItems, ...invInfo}}/>
            </div>
        </Layout>
    );
};

export default CreatePv;
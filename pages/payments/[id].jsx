import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router';
import Layout from '../../src/components/Layout';
import BasicInfo from '../../src/components/Payment/BasicInfo'
import PaymentInfo from '../../src/components/Payment/PaymentInfo'
import { FindAllInvoices } from '../../src/api';
import { useAlert } from '../../src/hooks/useCustomAlert';
import Endorsments from '../../src/components/Payment/Endorsments';

const CreatePv = () => {
    const router = useRouter();
    const { id } = router.query;
    const [invoice, setInvoice] = useState([])

    const { showAlert } = useAlert();

    useEffect(() => {
        (async () => {
            let response;
            response = await FindAllInvoices(id)

            console.log(response)
            if (response.code === 200) return setInvoice([response.data[0]]);
            return showAlert(response.message, 'error');
        })()
    }, [showAlert])

    return (
        <Layout>
            <div className='w-[90%] md:w-[80%] m-auto flex flex-col gap-8'>
                <BasicInfo />
                <PaymentInfo/>
                {/*<Endorsments/>*/}
            </div>
        </Layout>
    );
};

export default CreatePv;

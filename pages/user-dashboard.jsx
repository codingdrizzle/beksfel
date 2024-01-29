import React, { useEffect, useState } from 'react'
import Layout from '../src/components/Layout'
import OverviewCard from '../src/components/Dashboard/User/OverviewCard'
import { FaFileInvoiceDollar } from "react-icons/fa6";
import { FaCalendarTimes, FaClipboardCheck } from 'react-icons/fa';
import { MdPending } from 'react-icons/md';
import MonthlyStatusChart from '../src/components/Dashboard/User/MonthlyStatusChart';
import { FetchInvoicesCountUser } from '../src/api';
import { useAtomValue } from 'jotai';
import { authUser } from '../src/store';

const UserDashboard = () => {
    const [invoiceCounts, setInvoiceCounts] = useState({})
    const user = useAtomValue(authUser)

    useEffect(() => {
        (async () => {
            const response = await FetchInvoicesCountUser(user._id);
            if (response.code === 200) return setInvoiceCounts(response.data)
        })()
    }, [user])

    return (
        <Layout>
            <div className='grid grid-cols-10 gap-10 my-6'>
                <div className='col-span-10 grid grid-cols-1 gap-5'>
                    <div className='grid grid-cols-12 gap-5'>
                        <OverviewCard icon={<FaFileInvoiceDollar size={40} />} details={{ value: invoiceCounts?.totalCount, title: 'Total Invoices' }} customStyles={''} />
                        <OverviewCard icon={<FaClipboardCheck size={40} />} details={{ value: invoiceCounts?.countsByStatus?.approved, title: 'Approved Invoices' }} customStyles={''} />
                        <OverviewCard icon={<FaCalendarTimes size={40} />} details={{ value: invoiceCounts?.countsByStatus?.rejected, title: 'Rejected Invoices' }} customStyles={''} />
                        <OverviewCard icon={<MdPending size={40} />} details={{ value: invoiceCounts?.countsByStatus?.pending, title: 'Pending Invoices' }} customStyles={''} />
                    </div>
                    <MonthlyStatusChart />
                </div>
            </div>
        </Layout>
    )
}

export default UserDashboard
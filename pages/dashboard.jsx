import React, { useEffect, useState } from 'react';
import Layout from '../src/components/Layout';
import OverviewCard from '../src/components/Dashboard/Admin/OverviewCard';
import { FaFileInvoiceDollar } from "react-icons/fa6";
import { FaCalendarTimes, FaClipboardCheck } from 'react-icons/fa';
import { MdPending } from 'react-icons/md';
import MonthlyStatusChart from '../src/components/Dashboard/Admin/MonthlyStatusChart';
import TopInvoices from '../src/components/Dashboard/Admin/TopInvoices';
import { FetchInvoicesCount } from '../src/api';
import { useAtomValue } from 'jotai';
import { authUser } from '../src/store';
import MostRecentInvoices from '../src/components/Dashboard/Admin/RecentInvoices';
import StatusPercents from '../src/components/Dashboard/Admin/StatusPercentages';
import { useRouter } from 'next/router';

const Dashboard = () => {
    const [invoiceCounts, setInvoiceCounts] = useState({});
    const user = useAtomValue(authUser);

    const router = useRouter()

    useEffect(() => {
        (async () => {
            if (user.role === 'user') return router.push('/user-dashboard')
            const response = await FetchInvoicesCount();
            if (response.code === 200) return setInvoiceCounts(response.data);
        })()
    }, [user]);

    return (
        <Layout>
            <div className='grid grid-cols-10 gap-10 my-6'>
                <div className='col-span-10 lg:col-span-6 grid grid-cols-1 gap-5'>
                    <div className='grid grid-cols-12 gap-5'>
                        <OverviewCard icon={<FaFileInvoiceDollar size={40} />} details={{ value: invoiceCounts?.totalCount, title: 'Total Invoices' }} customStyles={''} />
                        <OverviewCard icon={<FaClipboardCheck size={40} />} details={{ value: invoiceCounts?.countsByStatus?.approved, title: 'Approved Invoices' }} customStyles={''} />
                        <OverviewCard icon={<FaCalendarTimes size={40} />} details={{ value: invoiceCounts?.countsByStatus?.rejected, title: 'Rejected Invoices' }} customStyles={''} />
                        <OverviewCard icon={<MdPending size={40} />} details={{ value: invoiceCounts?.countsByStatus?.pending, title: 'Pending Invoices' }} customStyles={''} />
                    </div>
                    <MonthlyStatusChart />
                    <div className='grid grid-cols-6 gap-10 rounded-lg'>
                        <TopInvoices />
                    </div>
                </div>

                <div className='col-span-10 lg:col-span-4 grid grid-cols-1 gap-5'>
                    <div className='col-span-1 bg-white rounded-lg p-4'>
                        <MostRecentInvoices />
                    </div>
                    <div className='col-span-1 bg-white rounded-lg p-4'>
                        <StatusPercents />
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default Dashboard;
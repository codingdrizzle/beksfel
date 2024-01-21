import React from 'react'
import Layout from '../src/components/Layout'
import OverviewCard from '../src/components/Dashboard/OverviewCard'
import { FaFileInvoiceDollar } from "react-icons/fa6";
import { FaCalendarTimes, FaClipboardCheck } from 'react-icons/fa';
import { MdPending } from 'react-icons/md';
import StatusChart from '../src/components/Dashboard/StatusChart';
import TopInvoices from '../src/components/Dashboard/TopInvoices';

const Dashboard = () => {
    return (
        <Layout>

            <div className='grid grid-cols-10 gap-10 my-6'>
                <div className='col-span-10 lg:col-span-7 grid grid-cols-1 gap-5'>
                    <div className='grid grid-cols-12 gap-5'>
                        <OverviewCard icon={<FaFileInvoiceDollar size={40} />} details={{ value: '127', title: 'Total Invoices' }} customStyles={''} />
                        <OverviewCard icon={<FaClipboardCheck size={40} />} details={{ value: '108', title: 'Approved Invoices' }} customStyles={''} />
                        <OverviewCard icon={<FaCalendarTimes size={40} />} details={{ value: '5', title: 'Rejected Invoices' }} customStyles={''} />
                        <OverviewCard icon={<MdPending size={40} />} details={{ value: '22', title: 'Pending Invoices' }} customStyles={''} />
                    </div>
                   <StatusChart/>
                    <div className='grid grid-cols-6 gap-10 rounded-lg'>
                        <TopInvoices/>
                        <div className='col-span-6 lg:col-span-3 bg-white rounded-lg p-4'>
                            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nesciunt eaque, sit dicta porro quis sapiente rerum quibusdam voluptates quasi nobis sed consequatur repudiandae officia odio repellendus non aliquam impedit ipsam! Fugiat beatae iure nisi soluta. Commodi nemo similique facilis magni, deserunt libero, eius laborum tempore quo enim aperiam ipsa exercitationem id non suscipit hic! Minima hic, quae ipsa rem veritatis quaerat omnis sunt necessitatibus rerum, error, minus maxime eius ex perferendis adipisci! Ipsum voluptatum possimus laudantium eligendi libero cupiditate, soluta iure! Similique reprehenderit possimus sapiente delectus error quam earum. Amet dicta accusantium in facere inventore voluptate facilis, itaque magnam eius?
                        </div>
                    </div>
                </div>

                <div className='col-span-10 lg:col-span-3 grid grid-cols-1 gap-5'>
                    <div className='col-span-1 bg-white rounded-lg p-4'>
                        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nesciunt eaque, sit dicta porro quis sapiente rerum quibusdam voluptates quasi nobis sed consequatur repudiandae officia odio repellendus non aliquam impedit ipsam! Fugiat beatae iure nisi soluta. Commodi nemo similique facilis magni, deserunt libero, eius laborum tempore quo enim aperiam ipsa exercitationem id non suscipit hic! Minima hic, quae ipsa rem veritatis quaerat omnis sunt necessitatibus rerum, error, minus maxime eius ex perferendis adipisci! Ipsum voluptatum possimus laudantium eligendi libero cupiditate, soluta iure! Similique reprehenderit possimus sapiente delectus error quam earum. Amet dicta accusantium in facere inventore voluptate facilis, itaque magnam eius?
                    </div>
                    <div className='col-span-1 bg-white rounded-lg p-4'>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis iusto tenetur ipsa nobis adipisci magnam minus earum error et, suscipit repellat. Quis corrupti eos excepturi omnis odit non libero minima?
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default Dashboard
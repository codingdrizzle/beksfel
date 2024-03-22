import React, { useState } from 'react'
import { FaCalendarWeek, FaCalendarDays } from "react-icons/fa6";
import { FaSlackHash } from "react-icons/fa";
import { RiSettings4Fill } from "react-icons/ri";
import { IoCalendarNumber } from "react-icons/io5";
import Modal from '../../src/components/Modal'
import Layout from '../../src/components/Layout'
import { Button } from '../../src/components/Button'
import { useRouter } from 'next/router'
import Back from '../../src/commons/Back'
import { SiCashapp } from 'react-icons/si';
import Single from '../../src/components/Expenses/Single';
import Week from '../../src/components/Expenses/Week';
import Month from '../../src/components/Expenses/Month';

const Expenses = () => {
    const router = useRouter()
    const [data, setData] = useState('')
    const [modalContent, setModalContent] = useState('single')

    const [showModal, setShowModal] = useState(false);

    const handleShowModal = (contentKey) => {
        setModalContent(contentKey)
        setShowModal(true);
    }
    return (
        <Layout>
            <Back to={'/payments'} />

            <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5 my-10 justify-center place-items-center'>
                <button className='col-span-1 w-full min-w-[100px] max-w-[250px] h-[80px] rounded-xl bg-white flex justify-start items-center p-5 space-x-2 cursor-pointer transition-all duration-300 group hover:scale-[1.04]' onClick={() => handleShowModal('single')}>
                    <FaSlackHash className='text-[30px] group-hover:text-blue-400  transition-all duration-300' />
                    <h1 className='text-left font-medium'>Export single</h1>
                </button>
                <button className='col-span-1 w-full min-w-[100px] max-w-[250px] h-[80px] rounded-xl bg-white flex justify-start items-center p-5 space-x-2 cursor-pointer transition-all duration-300 group hover:scale-[1.04]' onClick={() => handleShowModal('week')}>
                    <FaCalendarWeek className='text-[30px] group-hover:text-blue-400  transition-all duration-300' />
                    <h1 className='text-left font-medium'>Export for a week</h1>
                </button>
                <button className='col-span-1 w-full min-w-[100px] max-w-[250px] h-[80px] rounded-xl bg-white flex justify-start items-center p-5 space-x-2 cursor-pointer transition-all duration-300 group hover:scale-[1.04]' onClick={() => handleShowModal('month')}>
                    <IoCalendarNumber className='text-[30px] group-hover:text-blue-400  transition-all duration-300' />
                    <h1 className='text-left font-medium'>Export for a Month</h1>
                </button>
                <button className='col-span-1 w-full min-w-[100px] max-w-[250px] h-[80px] rounded-xl bg-white flex justify-start items-center p-5 space-x-2 cursor-pointer transition-all duration-300 group hover:scale-[1.04]' onClick={() => handleShowModal('year')}>
                    <FaCalendarDays className='text-[30px] group-hover:text-blue-400  transition-all duration-300' />
                    <h1 className='text-left font-medium'>Export for a Year</h1>
                </button>
                <button className='col-span-1 w-full min-w-[100px] max-w-[250px] h-[80px] rounded-xl bg-white flex justify-start items-center p-5 space-x-2 cursor-pointer transition-all duration-300 group hover:scale-[1.04]' onClick={() => handleShowModal('custom')}>
                    <RiSettings4Fill className='text-[30px] group-hover:text-blue-400  transition-all duration-300' />
                    <h1 className='text-left font-medium'>Custom</h1>
                </button>
            </div>

            <Modal isOpen={showModal}  onClose={() => setShowModal(false)}>
                {
                    modalContent === 'single' && <Single/>
                }
                {
                    modalContent === 'week' && <Week/>
                }
                {
                    modalContent === 'month' && <Month/>
                }
            </Modal>
        </Layout>
    )
}

export default Expenses
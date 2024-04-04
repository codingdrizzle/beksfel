import React, { useState } from 'react'
import { IoCalendarNumber } from "react-icons/io5";
import Modal from '../../src/components/Modal'
import Layout from '../../src/components/Layout'
import Back from '../../src/commons/Back'
import ExportExpenses from '../../src/components/Expenses/ExportExpenses';
import UploadExpenses from '../../src/components/Expenses/UploadExpenses';
import { FaFileExport } from "react-icons/fa";
import { RiFolderUploadFill } from "react-icons/ri";

const Expenses = () => {
    const [modalContent, setModalContent] = useState('export')

    const [showModal, setShowModal] = useState(false);

    const handleShowModal = (contentKey) => {
        setModalContent(contentKey)
        setShowModal(true);
    }
    return (
        <Layout>
            <Back to={'/payments'} />

            <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5 my-10 justify-center place-items-center'>
                <button className='col-span-1 w-full min-w-[100px] max-w-[250px] h-[80px] rounded-xl bg-white flex justify-start items-center p-5 space-x-2 cursor-pointer transition-all duration-300 group hover:scale-[1.04]' onClick={() => handleShowModal('export')}>
                    <FaFileExport className='text-[30px] group-hover:text-blue-400  transition-all duration-300' />
                    <h1 className='text-left font-medium'>Export Expenses</h1>
                </button>
                <button className='col-span-1 w-full min-w-[100px] max-w-[250px] h-[80px] rounded-xl bg-white flex justify-start items-center p-5 space-x-2 cursor-pointer transition-all duration-300 group hover:scale-[1.04]' onClick={() => handleShowModal('upload')}>
                    <RiFolderUploadFill className='text-[30px] group-hover:text-blue-400  transition-all duration-300' />
                    <h1 className='text-left font-medium'>Upload Expenses</h1>
                </button>
            </div>

            <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
                {
                    modalContent === 'export' && <ExportExpenses />
                }
                {
                    modalContent === 'upload' && <UploadExpenses />
                }
            </Modal>
        </Layout>
    )
}

export default Expenses
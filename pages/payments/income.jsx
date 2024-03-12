import React, { useEffect, useState } from 'react'
import Layout from '../../src/components/Layout'
import { Button } from '../../src/components/Button'
import { useRouter } from 'next/router'
import Back from '../../src/commons/Back'
import NotFound from '../../src/commons/NotFound'
import { MdDelete, MdEdit, MdDateRange } from 'react-icons/md'
import { FiSearch } from 'react-icons/fi'
import DatePicker from 'react-datepicker'
import { DeleteIncome, FetchAllIncome, EditIncome } from '../../src/api'
import { useAlert } from '../../src/hooks/useCustomAlert'
import Modal from '../../src/components/Modal'
import Input from '../../src/components/Input'
import { validateInput } from '../../src/utils/input-validator/validator'
import { IncomeSchema } from '../../src/utils/input-validator'

const Income = () => {
    const router = useRouter()
    const [incomes, setIncomes] = useState([])
    const { showAlert } = useAlert();
    const [filteredIncomes, setFilteredIncomes] = useState([]);
    const [searchValue, setSearchValue] = useState('');
    const [editItem, setEditItem] = useState({});
    const [showModal, setShowModal] = useState(false);

    const [siteName, setSiteName] = useState('');
    const [date, setDate] = useState('');
    const [amount, setAmount] = useState('');

    const handleDelete = async (income_id) => {
        const response = await DeleteIncome(income_id);
        if (response.status === 200) {
            showAlert(response.data?.message, 'success')
            return window.location.reload();
        }
        showAlert(response.data?.message, 'error')
        return null;
    }

    console.log(editItem)
    useEffect(() => {
        (async () => {
            const response = await FetchAllIncome();
            setIncomes(response.data)
        })()
    }, [])

    const handleSearch = (searchText) => {
        setSearchValue(searchText);
        const filtered = incomes.filter((income) =>
            Object.values(income).some((value) =>
                typeof value === 'string' && value.toLowerCase().includes(searchText.toLowerCase())
            )
        );
        setFilteredIncomes(filtered);
    };

    useEffect(() => {
        (() => {

            setSiteName(editItem.site_name)
            setDate(editItem.date?.split('T')[0])
            setAmount(editItem.amount)
        })()
    }, [editItem])

    const handleEditTrigger = (item) => {
        setEditItem(item)
        setShowModal(true)
    }

    const handleEditIncome = async () => {
        const errorMessage = validateInput(IncomeSchema, { siteName, date, amount })

        if (errorMessage) return showAlert(errorMessage, 'error')
        if (siteName === editItem.site_name && amount === editItem.amount && (new Date(date).toISOString()) === editItem.date) return showAlert('Nothing was changed, try making changes', 'error')
        
        const response = await EditIncome(editItem._id, { site_name: siteName, date, amount })
        if (response.code === 200) {
            setShowModal(false)
            return showAlert(response.message, 'success');
        }
        showAlert(response.message, 'error');

    }

    const data = filteredIncomes.length > 0 ? filteredIncomes : incomes

    return (
        <Layout>
            <Back to={'/payments'} />
            <Button theme={'black'} variant={'fill'} onClick={() => router.push('create-income')}>
                Create Income
            </Button>
            <div className="rounded-md flex space-x-2 items-center justify-between">
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-darkThemeTextLight">
                        <FiSearch />
                    </div>
                    <input
                        type="search"
                        id="default-search"
                        value={searchValue}
                        onChange={(e) => handleSearch(e.target.value)}
                        className="block w-full p-2 pl-10 text-sm text-gray-900 border-[1px] border-gray-300 rounded-lg  focus:border-blue-400 focus:border-[1px] focus:outline-none ring-0 focus:ring-0 bg-transparent"
                        placeholder="Search by name/ID"
                    />
                </div>
            </div>
            <div className='overflow-x-auto'>
                <div className='min-w-full w-max'>
                    {
                        data.length === 0 ? <NotFound /> :
                            <div className='min-w-full w-max'>
                                <div className='w-full grid grid-cols-4 gap-10 py-4 px-10 my-2 bg-blue-100 dark:bg-darkTheme1 rounded-lg text-primaryBlue font-bold'>
                                    <div className="flex items-center justify-start">
                                        <span>Site Name</span>
                                    </div>
                                    <div className="flex items-center justify-start">
                                        <span>Date</span>
                                    </div>
                                    <div className="flex items-center justify-start">
                                        <span>Amount</span>
                                    </div>
                                    <div className="flex items-center justify-start">
                                        <span>Actions</span>
                                    </div>
                                </div>
                            </div>
                    }
                    {
                        data.map((item, index) =>
                        (<div key={index} className='group w-full bg-white dark:bg-transparent grid grid-cols-4 gap-10 py-4 px-10 dark:text-gray-400 font-light hover:bg-blue-50 dark:hover:bg-darkTheme1' style={{ transition: 'all 0.5s ease' }}>
                            <div className="flex items-center justify-start">
                                <span>{item.site_name}</span>
                            </div>
                            <div className="flex items-center justify-start">
                                <span>{item.date?.split('T')[0]}</span>
                            </div>
                            <div className="flex items-center justify-start">
                                <span>{item.amount}</span>
                            </div>
                            <div className='flex justify-start items-center space-x-3'>
                                <button className='w-auto h-auto py-2 rounded-md opacity-0 group-hover:opacity-100 flex justify-center items-center bg-black text-white text-base font-medium px-3 cursor-pointer space-x-2' onClick={() => handleEditTrigger(item)}>
                                    <MdEdit size={20} />
                                </button>
                                <button className='w-auto h-auto py-2 rounded-md opacity-0 group-hover:opacity-100 flex justify-center items-center bg-red-500 text-white text-base font-medium px-3 cursor-pointer space-x-2' onClick={() => handleDelete(item._id)}>
                                    <MdDelete size={25} />
                                </button>
                            </div>
                        </div>)
                        ).reverse()}
                </div>
            </div>
            <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
                <div className='my-6'>
                    <Back to={'/payments/income'} />
                    <h1 className='text-2xl font-semibold'>Edit income</h1>
                    <h1 className='my-3'>Modify income details with the form below.</h1>
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
                            <Button theme={'black'} variant={'fill'} customClasses={'w-full'} onClick={handleEditIncome}>
                                <span className='block text-center w-full'>Edit Income</span>
                            </Button>
                        </div>
                    </form>
                </div>
            </Modal>
        </Layout>
    )
}

export default Income
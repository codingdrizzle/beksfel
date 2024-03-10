import React, { useState } from 'react'
import Vouchers from './Vouchers'
import { FiSearch } from 'react-icons/fi'

const ListVouchers = ({ pvs, isLoading }) => {
    const [filteredInvoices, setFilteredInvoices] = useState([]);
    const [searchValue, setSearchValue] = useState('');

    const handleSearch = (searchText) => {
        setSearchValue(searchText);
        const filtered = invoices.filter((invoice) =>
            Object.values(invoice).some((value) =>
                typeof value === 'string' && value.toLowerCase().includes(searchText.toLowerCase())
            )
        );
        setFilteredInvoices(filtered);
    };
    
    return (
            <div className='py-10'>
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
                <Vouchers isLoading={isLoading} data={filteredInvoices.length > 0 ? filteredInvoices : pvs} />
            </div>
    )
}

export default ListVouchers;
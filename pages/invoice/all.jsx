import React, { useEffect, useState } from 'react'
import Invoices from '../../src/components/Invoice/Invoices'
import Invoice from '.'
import { FindAllInvoices } from '../../src/api'
import { useAlert } from '../../src/hooks/useCustomAlert'
import { FiSearch } from 'react-icons/fi'


const AllInvoices = () => {
    const [invoices, setInvoices] = useState([])
    const [filteredInvoices, setFilteredInvoices] = useState([]);
    const [searchValue, setSearchValue] = useState('');
    const { showAlert } = useAlert();
    const [selectedFilter, setSelectedFilter] = useState('default');

    useEffect(() => {
        (async () => {
            let response;
            response = await FindAllInvoices()

            if (response.code === 200) return setInvoices([...response.data]);
            return showAlert(response.message, 'error');
        })()
    }, [showAlert])

    const handleFilter = (filterValue) => {
        switch (filterValue) {
            case 'approved':
            case 'rejected':
            case 'pending':
                setSelectedFilter(filterValue);
                const filtered = invoices.filter((invoice) => invoice.status === filterValue);
                setFilteredInvoices(filtered);
                break;

            case 'default':
                setSelectedFilter('default');
                setFilteredInvoices(invoices);
                break;

            default:
                break;
        }
    };

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
        <Invoice>
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
                <select
                    className="bg-transparent px-3 py-2 text-sm text-gray-900 border-[1px] border-gray-300 rounded-lg  focus:border-blue-400 focus:border-[1px] focus:outline-none"
                    onChange={(e) => handleFilter(e.target.value)}
                >
                    <option value="default" hidden>Filter by</option>
                    <option value="approved">Approved</option>
                    <option value="rejected">Rejected</option>
                    <option value="pending">Pending</option>
                    <option value="default">Reset</option>
                </select>
            </div>
            <Invoices data={filteredInvoices.length > 0 ? filteredInvoices : invoices}  />
        </Invoice>
    )
}

export default AllInvoices;
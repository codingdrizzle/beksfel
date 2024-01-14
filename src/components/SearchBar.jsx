import React, { useState } from 'react';
import { FiSearch } from 'react-icons/fi';

const SearchBar = ({ handleSearch }) => {
    const [searchBy, setSearchBy] = useState('');

    const onSearchChange = (e) => {
        const value = e.target.value;
        setSearchBy(value);
        return handleSearch(value);
    }

    return (
        <div className='relative'>
            <div className='absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-darkThemeTextLight'>
                <FiSearch />
            </div>
            <input type='search' id='default-search' value={searchBy} className='block w-full p-2 pl-10 text-sm text-gray-900 border-[1px] border-gray-300 rounded-lg  focus:border-primaryBlue focus:border-[1px] focus:outline-none ring-0 focus:ring-0 bg-transparent dark:border-darkThemeTextLight dark:placeholder-gray-400 dark:text-gray-100 dark:focus:border-primaryBlue' placeholder='Search by name/ID' onChange={onSearchChange} />
        </div>
    );
};

export default SearchBar;
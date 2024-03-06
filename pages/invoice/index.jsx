import React from 'react'
import Layout from '../../src/components/Layout'
import Tabs from '../../src/components/Tabs'
import { Button } from '../../src/components/Button'
import { useRouter } from 'next/router'
import { useAtomValue } from 'jotai'
import { authUser } from '../../src/store'

const Invoice = ({ children }) => {
    const user = useAtomValue(authUser)
    const router = useRouter();
    const searchFilter = (searchValue, arr) => {
        let searchBy = searchValue.split(" ");

        return arr.filter(item =>
            searchBy.every(term =>
                Object.values(item).some(value => {
                    if (typeof value === 'string') {
                        return value.includes(term);
                    } else if (Array.isArray(value)) {
                        // Handle arrays as needed (e.g., check if any element includes the term)
                        return value.some(element => String(element).includes(term));
                    } else if (typeof value === 'object' && value !== null) {
                        // Recursively handle nested objects
                        return searchFilter(term, [value]).length > 0;
                    }
                    return false; // Default case if the value is not handled
                })
            )
        );
    };

    const tabsForUser = [
        {
            title: 'My Invoices',
            route: '/invoice/me'
        }
    ]
    const tabsForAdmins = [
        {
            title: 'All Invoices',
            route: '/invoice/all'
        },
        {
            title: 'My Invoices',
            route: '/invoice/me'
        }
    ]

    return (
        <Layout>
            <div className='flex flex-col'>
                <div className='w-full flex justify-end items-center my-7'>
                    <Button theme={'red'} onClick={() => router.push('/invoice/create')}>Create Invoice</Button>
                </div>
                <Tabs tabs={user.role === 'user' ? tabsForUser : tabsForAdmins} />
                {children}
            </div>
        </Layout>
    )
}

export default Invoice
import { FaFileInvoiceDollar, FaFileInvoice, FaMoneyCheckDollar } from "react-icons/fa6";
import { FaHandHoldingUsd } from "react-icons/fa";
import { BsGridFill } from "react-icons/bs";
import { AiFillThunderbolt } from "react-icons/ai";


export const NavItems = [
    {
        name: 'Dashboard',
        route: '/dashboard',
        icon: <BsGridFill />
    },
    {
        name: 'Invoice',
        icon: <FaFileInvoiceDollar />,
        subItems: [
            {
                name: 'All Invoices',
                route: '/invoice/all',
                icon: <FaFileInvoice />
            },
            {
                name: 'My Invoices',
                route: '/invoice',
                icon: <FaMoneyCheckDollar />
            },
            {
                name: 'Actions',
                route: '/invoice/actions',
                icon: <AiFillThunderbolt />
            },
        ]
    },
    {
        name: 'Payments',
        icon: <FaHandHoldingUsd />,
        subItems: [
            {
                name: 'Vouchers',
                route: '/payment/vouchers',
                icon: <FaFileInvoice />
            }
        ]
    },

] 
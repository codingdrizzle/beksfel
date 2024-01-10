import { FaFileInvoiceDollar, FaFileInvoice, FaMoneyCheckDollar, FaLock } from "react-icons/fa6";
import { FaHandHoldingUsd, FaUserEdit } from "react-icons/fa";
import { BsGridFill } from "react-icons/bs";
import { MdDelete } from "react-icons/md";
import { AiFillDelete } from "react-icons/ai";

export const NavItems = [
    {
        name: 'Dashboard',
        route: '/dashboard',
        icon: <BsGridFill />,
        permissions: ['user', 'accountant', 'manager'],
    },
    {
        name: 'Invoice',
        route: '/invoice',
        icon: <FaFileInvoiceDollar />,
        permissions: ['user', 'accountant', 'manager'],
        //subItems: [
        //    {
        //        name: 'All Invoices',
        //        route: '/invoice/all',
        //        icon: <FaFileInvoice />
        //    },
        //    {
        //        name: 'My Invoices',
        //        route: '/invoice',
        //        icon: <FaMoneyCheckDollar />
        //    },
        //    {
        //        name: 'Actions',
        //        route: '/invoice/actions',
        //        icon: <AiFillThunderbolt />
        //    },
        //]
    },
    {
        name: 'Payments Voucher',
        route: '/payments',
        icon: <FaHandHoldingUsd />,
        permissions: ['accountant', 'manager']
        //subItems: [
        //    {
        //        name: 'Vouchers',
        //        route: '/payment/vouchers',
        //        icon: <FaFileInvoice />
        //    }
        //]
    },

]


//export const Apps = [
//    {
//        name: '',
//        route: '/edit-profile',
//        icon: <FaFileInvoiceDollar />,
//        permissions: ['user', 'accountant', 'manager'],
//    },
//    {
//        name: 'Change Password',
//        route: '/new-password',
//        icon: <BsGridFill />,
//        permissions: ['user', 'accountant', 'manager'],
//    },
//    {
//        name: 'Delete Account',
//        route: '/delete-account',
//        icon: <FaHandHoldingUsd />,
//        permissions: ['user', 'accountant', 'manager']
//    },

//] 

export const Account = [
    {
        name: 'Edit Profile',
        route: '/edit-profile',
        icon: <FaUserEdit />,
        permissions: ['user', 'accountant', 'manager'],
    },
    {
        name: 'Change Password',
        route: '/new-password',
        icon: <FaLock />,
        permissions: ['user', 'accountant', 'manager'],
    },
    {
        name: 'Delete Account',
        route: '/delete-account',
        icon: <AiFillDelete/>,
        permissions: ['user', 'accountant', 'manager']
    },

] 
import { FaFileInvoiceDollar, FaFileInvoice, FaMoneyCheckDollar, FaLock } from "react-icons/fa6";
import { FaHandHoldingUsd, FaUserEdit } from "react-icons/fa";
import { BsGridFill } from "react-icons/bs";
import { MdDelete } from "react-icons/md";
import { AiFillDelete } from "react-icons/ai";

let user
if (typeof window !== "undefined") user = JSON.parse(localStorage.getItem('user'));

export const NavItems = [
    {
        name: 'Dashboard',
        route: user?.role === 'user' ? '/user-dashboard' : '/dashboard',
        icon: <BsGridFill />,
        permissions: ['user', 'accountant', 'manager'],
    },
    {
        name: 'Invoice',
        route: user?.role === 'user' ? '/invoice/me': '/invoice/all',
        icon: <FaFileInvoiceDollar />,
        permissions: ['user', 'accountant', 'manager'],
    },
    {
        name: 'Payments Voucher',
        route: '/payments',
        icon: <FaHandHoldingUsd />,
        permissions: ['accountant', 'manager']
    },

]



export const Account = [
    {
        name: 'Edit Profile',
        route: '/edit-profile',
        icon: <FaUserEdit />,
        permissions: ['user', 'accountant', 'manager'],
    },
    //{
    //    name: 'Change Password',
    //    route: '/new-password',
    //    icon: <FaLock />,
    //    permissions: ['user', 'accountant', 'manager'],
    //},
    //{
    //    name: 'Delete Account',
    //    route: '/delete-account',
    //    icon: <AiFillDelete/>,
    //    permissions: ['user', 'accountant', 'manager']
    //},

] 
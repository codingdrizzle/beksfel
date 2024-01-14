import { atom, createStore } from 'jotai'
import { atomWithStorage } from 'jotai/utils'


export const token = atomWithStorage('token', "");

export const authUser = atomWithStorage('user', "");

export const invoiceInitialItem = {
    description: null,
    quantity: null,
    unit: null,
    rate: null,
    amount: null
}

export const invoiceInitialInfo = {
    invoice_number: null,
    project_name: '',
    project_location: '',
    date: null,
    invoice_by: '',
}

export const invoiceItems = atom([invoiceInitialItem])
export const invoiceInfo = atom(invoiceInitialInfo)

export const lastItem = atom()
export const mode = atom()

export const store = createStore();
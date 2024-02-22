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

export const pvInit = {
    pv_number: null,
    date: null,
    allocation: null,
    name: null,
    payment_type: null,
    cheque_number: null,
    bank_name: null,
    gross_amount: null,
    tax: null,
    net_amount: null,
    tin_number: null,
    balance: null,
    invoice_id: null,
    invoice: null,
    status: null,
    approved_by: null,
    approved_date: null,
    received_by: null,
    receiver_contact: null,
    receiver_signature: null
}

export const invoiceItems = atom([invoiceInitialItem])
export const invoiceInfo = atom(invoiceInitialInfo)

export const pv = atom(pvInit)

export const lastItem = atom()
export const mode = atom()

export const store = createStore();
import API from './config'

export const Login = async (email, password) => {
    try {
        const response = await API.post('/auth/login', { email, password })
        return { accessToken: response.data.token, type: 'success', message: response.data.message }
    } catch (error) {
        if (error === undefined) {
            return { message: 'Check your internet connection and try again.', type: 'failure' }
        }
        return { message: error.data.message }
    }
}

export const VerifyAccount = async (firstname, email) => {
    try {
        const response = await API.post('/auth/verify-account', { firstname, email })
        return response.data
    } catch (error) {
        if (error === undefined) {
            return { message: 'Check your internet connection and try again.', type: 'failure' }
        }
        return { message: error.data.message }
    }
}

export const Register = async (userData) => {
    try {
        const response = await API.post('/user/new', userData)
        return response.data
    } catch (error) {
        if (error === undefined) {
            return { message: 'Check your internet connection and try again.', type: 'failure' }
        }
        return { message: error.data.message }
    }
}

export const SendResetPasswordLink = async (email) => {
    try {
        const response = await API.post('/auth/reset-link', { email })
        return response.data
    } catch (error) {
        if (error === undefined) {
            return { message: 'Check your internet connection and try again.', type: 'failure' }
        }
        return { message: error.data.message }
    }
}

export const ResetPasswordLink = async (email, password) => {
    try {
        const response = await API.post('/auth/reset-password', { email, password })
        return response.data
    } catch (error) {
        if (error === undefined) {
            return { message: 'Check your internet connection and try again.', type: 'failure' }
        }
        return { message: error.data.message }
    }
}

export const EditUserProfile = async (id, data) => {
    try {
        const response = await API.put(`/user/${id}`, data)
        return response.data
    } catch (error) {
        if (error === undefined) {
            return { message: 'Check your internet connection and try again.', type: 'failure' }
        }
        return { message: error.data.message }
    }
}


export const FindAllInvoices = async (query) => {
    try {
        const response = await API.post('/invoices', query)
        return response.data
    } catch (error) {
        if (error === undefined) {
            return { message: 'Check your internet connection and try again.', type: 'failure' }
        }
        return { message: error.data.message }
    }
}

export const FindAllInvoicesByUser = async (created_by) => {
    try {
        const response = await API.post(`/invoices`, { created_by })
        return response.data
    } catch (error) {
        if (error === undefined) {
            return { message: 'Check your internet connection and try again.', type: 'failure' }
        }
        return { message: error.data.message }
    }
}

export const FindOneInvoice = async (id) => {
    try {
        const response = await API.get(`/invoice/${id}`)
        return response.data
    } catch (error) {
        if (error === undefined) {
            return { message: 'Check your internet connection and try again.', type: 'failure' }
        }
        return { message: error.data.message }
    }
}

export const CreateNewInvoice = async (invoice) => {
    try {
        const response = await API.post(`/invoice/new`, invoice)
        return response.data
    } catch (error) {
        if (error === undefined) {
            return { message: 'Check your internet connection and try again.', type: 'failure' }
        }
        if (error.data.message) return { message: error.data.message }
        else return { message: error.data?.error?.message }
    }
}

export const FetchStatusCountPerMonth = async () => {
    try {
        const response = await API.get('/invoices/status-count-per-month')
        return response.data
    } catch (error) {
        if (error === undefined) {
            return { message: 'Check your internet connection and try again.', type: 'failure' }
        }
        if (error.data.message) return { message: error.data.message }
        else return { message: error.data?.error?.message }
    }
}

export const FetchStatusCountPerMonthUser = async (created_by) => {
    try {
        const response = await API.get(`/invoices/status-count-per-month/user/${created_by}`)
        return response.data
    } catch (error) {
        if (error === undefined) {
            return { message: 'Check your internet connection and try again.', type: 'failure' }
        }
        if (error.data.message) return { message: error.data.message }
        else return { message: error.data?.error?.message }
    }
}

export const FetchInvoicesCount = async () => {
    try {
        const response = await API.get('/invoices/status-count-all')
        return response.data
    } catch (error) {
        if (error === undefined) {
            return { message: 'Check your internet connection and try again.', type: 'failure' }
        }
        if (error.data.message) return { message: error.data.message }
        else return { message: error.data?.error?.message }
    }
}

export const FetchInvoicesCountUser = async (userId) => {
    try {
        const response = await API.get(`/invoices/count/user/${userId}`)
        return response.data
    } catch (error) {
        if (error === undefined) {
            return { message: 'Check your internet connection and try again.', type: 'failure' }
        }
        if (error.data.message) return { message: error.data.message }
        else return { message: error.data?.error?.message }
    }
}

export const FetchInvoicesTop5 = async () => {
    try {
        const response = await API.get('/invoices/top5')
        return response.data
    } catch (error) {
        if (error === undefined) {
            return { message: 'Check your internet connection and try again.', type: 'failure' }
        }
        if (error.data.message) return { message: error.data.message }
        else return { message: error.data?.error?.message }
    }
}

export const RecentInvoices = async () => {
    try {
        const response = await API.get('/invoices/recents')
        return response.data
    } catch (error) {
        if (error === undefined) {
            return { message: 'Check your internet connection and try again.', type: 'failure' }
        }
        if (error.data.message) return { message: error.data.message }
        else return { message: error.data?.error?.message }
    }
}

export const StatusPercentages = async () => {
    try {
        const response = await API.get('/invoices/status-percentage')
        return response.data
    } catch (error) {
        if (error === undefined) {
            return { message: 'Check your internet connection and try again.', type: 'failure' }
        }
        if (error.data.message) return { message: error.data.message }
        else return { message: error.data?.error?.message }
    }
}

export const EditInvoice = async (id, data) => {
    try {
        const response = await API.put(`/invoice/${id}`, data)
        return response.data
    } catch (error) {
        if (error === undefined) {
            return { message: 'Check your internet connection and try again.', type: 'failure' }
        }
        if (error.data.message) return { message: error.data.message }
        else return { message: error.data?.error?.message }
    }
}

export const CreatePv = async (data) => {
    try {
        const response = await API.post(`/voucher/new`, { ...data })
        return response.data
    } catch (error) {
        if (error === undefined) {
            return { message: 'Check your internet connection and try again.', type: 'failure' }
        }
        if (error.data.message) return { message: error.data.message }
        else return { message: error.data?.error?.message }
    }
}

export const FetchAllPvs = async () => {
    try {
        const response = await API.get('/vouchers')
        return response.data
    } catch (error) {
        if (error === undefined) {
            return { message: 'Check your internet connection and try again.', type: 'failure' }
        }
        if (error.data.message) return { message: error.data.message }
        else return { message: error.data?.error?.message }
    }
}

export const FetchPv = async (id) => {
    try {
        const response = await API.get(`/voucher/${id}`)
        return response.data
    } catch (error) {
        if (error === undefined) {
            return { message: 'Check your internet connection and try again.', type: 'failure' }
        }
        if (error.data.message) return { message: error.data.message }
        else return { message: error.data?.error?.message }
    }
}

export const DeletePv = async (id) => {
    try {
        const response = await API.delete(`/voucher/${id}`)
        return response
    } catch (error) {
        if (error === undefined) {
            return { message: 'Check your internet connection and try again.', type: 'failure' }
        }
        if (error.data.message) return { message: error.data.message }
        else return { message: error.data?.error?.message }
    }
}

export const CreateNewIncome = async (data) => {
    try {
        const response = await API.post(`/income/new`, data)
        return response.data
    } catch (error) {
        if (error === undefined) {
            return { message: 'Check your internet connection and try again.', type: 'failure' }
        }
        if (error.data.message) return { message: error.data.message }
        else return { message: error.data?.error?.message }
    }
}

export const FetchAllIncome = async (id) => {
    try {
        const response = await API.get(`/income`)
        return response.data
    } catch (error) {
        if (error === undefined) {
            return { message: 'Check your internet connection and try again.', type: 'failure' }
        }
        if (error.data.message) return { message: error.data.message }
        else return { message: error.data?.error?.message }
    }
}

export const DeleteIncome = async (id) => {
    try {
        const response = await API.delete(`/income/${id}`)
        return response
    } catch (error) {
        if (error === undefined) {
            return { message: 'Check your internet connection and try again.', type: 'failure' }
        }
        if (error.data.message) return { message: error.data.message }
        else return { message: error.data?.error?.message }
    }
}

export const EditIncome = async (id, data) => {
    try {
        const response = await API.put(`/income/${id}`, data)
        return response.data
    } catch (error) {
        if (error === undefined) {
            return { message: 'Check your internet connection and try again.', type: 'failure' }
        }
        if (error.data.message) return { message: error.data.message }
        else return { message: error.data?.error?.message }
    }
}

export const FetchRange = async (monthYear) => {
    try {
        const response = await API.post(`/vouchers-range`, monthYear)
        return response.data
    } catch (error) {
        if (error === undefined) {
            return { message: 'Check your internet connection and try again.', type: 'failure' }
        }
        if (error.data.message) return { message: error.data.message }
        else return { message: error.data?.error?.message }
    }
}

export const CreateExpenses = async (expenses) => {
    try {
        const response = await API.post(`/expenses/new`, expenses)
        return response.data
    } catch (error) {
        if (error === undefined) {
            return { message: 'Check your internet connection and try again.', type: 'failure' }
        }
        if (error.data.message) return { message: error.data.message }
        else return { message: error.data?.error?.message }
    }
}

export const FetchExpenses = async (year) => {
    try {
        const response = await API.get(`/expenses/${year}` )
        return response.data
    } catch (error) {
        if (error === undefined) {
            return { message: 'Check your internet connection and try again.', type: 'failure' }
        }
        if (error.data.message) return { message: error.data.message }
        else return { message: error.data?.error?.message }
    }
}
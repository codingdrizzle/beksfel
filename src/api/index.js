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
        const response = await API.post('/auth/reset-link', {email})
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
        const response = await API.post('/auth/reset-password', {email,password})
        return response.data
    } catch (error) {
        if (error === undefined) {
            return { message: 'Check your internet connection and try again.', type: 'failure' }
        }
        return { message: error.data.message }
    }
}

export const FindAllInvoices = async () => {
    try {
        const response = await API.get('/invoices')
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
        const response = await API.post(`/invoices`, {created_by})
        return response.data
    } catch (error) {
        if (error === undefined) {
            return { message: 'Check your internet connection and try again.', type: 'failure' }
        }
        return { message: error.data.message }
    }
}

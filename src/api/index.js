import API from './config'

export const Login = async (email, password) => {
    try {
        const response = await API.post('/auth/login', { email, password })
        return response.data
    } catch (error) {
        return error.response?.data?.message
    }
}

export const VerifyAccount = async (firstname, email) => {
    try {
        const response = await API.post('/auth/verify-account', { firstname, email })
        return response.data
    } catch (error) {
        return error.response?.data?.message
    }
}

export const Register = async (userData) => {
    try {
        const response = await API.post('/user/new', userData)
        return response.data
    } catch (error) {
        return error.response?.data?.message
    }
}

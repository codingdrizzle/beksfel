import API from './config'

export const Login = async (email, password) => {
    try {
        const response = await API.post('/auth/login', { email, password })
        return response.data
    } catch (error) {
        return error.response?.data?.message
    }
}

export const Register = async (firstname, surname, email, password) => {
    try {
        const response = await API.post('/auth/login', { email, password })
        return response.data
    } catch (error) {
        return error.response?.data?.message
    }
}

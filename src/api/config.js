import axios, { AxiosHeaders } from "axios";

let token = "";

if (typeof window !== "undefined") token = localStorage.getItem("token") || "";

export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const default_headers = { authorization: `bearer ${token}` };


const cancelTokenSource = axios.CancelToken.source();

const API = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        "Content-Type": "application/json",
    }
});

const API_AUTH = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        "Content-Type": "application/json",
    }
});

//API.interceptors.request.use(
//    (config) => {
//        // Modify request config before sending
//        return config;
//    },
//    (error) => {
//        // Handle request interceptor error
//        console.error('Request interceptor error:', error.message);
//        return Promise.reject(error);
//    }
//);

// Response interceptor
API.interceptors.response.use(
    (response) => {
        // Handle successful response
        return response;
    },
    (error) => {
        // Handle response interceptor error
        //console.error('Response interceptor error:', error.message);
        return Promise.reject(error.response);
    }
);


//API.interceptors.response.use(
//    response => response,
//    error => {
//          const status = error.response ? error.response.status : null;
//        return Promise.reject(error);
//    }
//);

API_AUTH.interceptors.request.use(config => {
    const authToken = localStorage.getItem('token');
    if (authToken) {
        config.headers.Authorization = `Bearer ${authToken}`;
    }   
    return config;
})


cancelTokenSource.cancel('Request canceled by user');

export default API;

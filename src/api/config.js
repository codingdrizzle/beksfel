import axios, { AxiosHeaders } from "axios";

let token = "";

if (typeof window !== "undefined") token = localStorage.getItem("token") || "";

export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const default_headers = { authorization: `bearer ${token}`};

const API = axios.create({
    baseURL: API_BASE_URL,
     headers: {
        "Content-Type": "application/json", 
      }
});


export default API;

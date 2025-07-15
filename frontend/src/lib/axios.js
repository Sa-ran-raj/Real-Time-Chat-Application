import axios from "axios";

export const axiosInstance = axios.create({
    baseURL: `${import.meta.env.VITE_API_BASE_URL}/api`, // append /api properly
    withCredentials: true
});
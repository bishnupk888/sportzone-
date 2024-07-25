import axios from 'axios';
import { toast } from 'react-toastify';

const backendBaseUrl = import.meta.env.VITE_BACKEND_BASE_URL;

const axiosInstanceAdmin = axios.create({
    baseURL: backendBaseUrl,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
        'timeout': 5000,
    },
});

axiosInstanceAdmin.interceptors.response.use(
    response => response,
    error => {
        if (error.response && error.response.status === 401) {
            console.error(error.response)
            localStorage.removeItem('adminData');
            toast.error( error.response.message,", you have been logged out");
            window.location.href = `/admin/login`;
        }
        return Promise.reject(error);
    }
);

export default axiosInstanceAdmin;  
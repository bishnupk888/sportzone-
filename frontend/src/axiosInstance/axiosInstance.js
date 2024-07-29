import axios from 'axios';
import { toast } from 'react-toastify';

const backendBaseUrl = import.meta.env.VITE_BACKEND_BASE_URL;

const axiosInstance = axios.create({
    baseURL: backendBaseUrl,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
        'timeout': 5000,
    },
});

axiosInstance.interceptors.response.use(
    response => response,
    error => {
        if (error.response && error.response.status === 403) {
            
            localStorage.removeItem('userData');
            window.location.href = `/home`;
            toast.error('You have been logged out because your account is blocked.');
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;  
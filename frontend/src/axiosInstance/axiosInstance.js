import axios from 'axios'

const backendBaseUrl = import.meta.env.VITE_BACKEND_BASE_URL; 
console.log('backendBaseUrl = ',backendBaseUrl)

const axiosInstance = axios.create({
    baseURL : backendBaseUrl,
    withCredentials: true,
    headers: {
      'Content-Type': "application/json",
      'timeout' : 5000,
    }, 
})
console.log("completed axiosInstance");
export default axiosInstance
import { io } from "socket.io-client";
const backendUrl = import.meta.env.VITE_BACKEND_BASE_URL
const socket = io(backendUrl,{
    autoConnect: false,
}
)
export default socket 


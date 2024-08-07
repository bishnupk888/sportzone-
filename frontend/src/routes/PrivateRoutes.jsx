import { useSelector } from 'react-redux'
import { Outlet, Navigate } from 'react-router-dom'

const PrivateRoutes = ({role}) => {
    const isLoggedIn = useSelector((state)=>{
       return role === state.user.userRole}
    )
    return(
        isLoggedIn ? <Outlet/> : <Navigate to="/home"/>
    )
}   

export default PrivateRoutes
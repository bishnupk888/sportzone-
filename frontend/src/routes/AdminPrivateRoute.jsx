import { useSelector } from 'react-redux'
import { Outlet, Navigate } from 'react-router-dom'

const PrivateRoutes = ({role}) => {
    const isLoggedIn = useSelector((state)=>{
       return role === state.admin.adminRole}
    )
    
    // let  = {'token': false}
    return(
        isLoggedIn ? <Outlet/> : <Navigate to="/admin/login"/>
    )
}   

export default PrivateRoutes
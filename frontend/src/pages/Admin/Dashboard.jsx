import React,{useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Dashboard = () => {
  const userRole = localStorage.getItem('adminData');

  const navigate = useNavigate()
    useEffect(()=>{
      if(!userRole){
        navigate('/admin/login')
        toast.info("please login for more")       
      }
    },[])

  return (
    <div className='bg-white text-white '>Dashboard</div>
  )
}

export default Dashboard
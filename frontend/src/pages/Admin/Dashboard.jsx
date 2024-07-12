import React,{useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Dashboard = () => {
  const userRole = localStorage.getItem('adminData');
  console.log('userRole of admin : ',userRole);

  const navigate = useNavigate()
    useEffect(()=>{
      if(!userRole){
        navigate('/admin/login')
        toast.info("please login for more")       
      }
    },[])

  return (
    <div className='bg-white text-black '>Dashboard</div>
  )
}

export default Dashboard
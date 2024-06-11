import React,{useEffect} from 'react'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import ServiceList from '../components/Services/ServiceList'


 
const Services = (props) => {
  const userRole = useSelector((state)=>state.user.userRole)
    
    const navigate = useNavigate()
    useEffect(() => {
      if (!userRole) {
        navigate('/home');
        toast.info(" please Login for more");
      }
    }, [])

  return (
    <div>

      <ServiceList/>
    </div>
  )
}

export default Services
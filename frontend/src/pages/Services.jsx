import React,{useEffect} from 'react'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'


 
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
    <div>Services</div>
  )
}

export default Services
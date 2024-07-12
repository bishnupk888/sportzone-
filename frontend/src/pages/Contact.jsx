import React,{useEffect} from 'react'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'


const Contact = () => {
  window.scrollTo(0, 0);
  const userRole = useSelector((state)=>state.user.userRole)    
  const navigate = useNavigate()
  useEffect(()=>{
    if(!userRole){
      navigate('/home')
      toast.info("please login for more")
      
    }
  },[])
  return (
    <div>Contact</div>
  )
}

export default Contact
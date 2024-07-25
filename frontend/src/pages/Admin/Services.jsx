import React,{useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Services = () => {

  const userRole = localStorage.getItem('adminData');

  const navigate = useNavigate()

  return (
    <div>Services</div>
  )
}

export default Services
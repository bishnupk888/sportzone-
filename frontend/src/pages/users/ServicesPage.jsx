import React, { useEffect, useState } from 'react'
import ServiceList from '../../components/Services/ServiceList'
import axiosInstance from '../../axiosInstance/axiosInstance'
import { toast } from 'react-toastify'
const ServicesPage = () => {

const [services,setServices] = useState([])



useEffect(()=>{
  
  axiosInstance.get('/api/users/services/list').then((response)=>{
    const servicesList = new Set(response.data.data.map(service => service.toUpperCase()));
    setServices([...servicesList]);
    console.log(response.data.data);

}).catch((error)=>{
  toast.error('failed to fetch services')
  console.error("failed to fetch services",error);
})
},[])

  return (
    <>
    <div className='text-white text-3xl px-10 mt-10'>AVAILABLE SERVICES </div>
    <ServiceList services={services}/>
    </>
  )
}

export default ServicesPage

  

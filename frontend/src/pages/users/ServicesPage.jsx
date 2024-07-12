import React, { useEffect, useState } from 'react'
import ServiceList from '../../components/services/ServiceList'
import { toast } from 'react-toastify'
import apiServices from '../../apiServices/apiServices'
const ServicesPage = () => {

const [services,setServices] = useState([])



useEffect(()=>{
  window.scrollTo(0, 0);
  apiServices.getServicesList()
  .then((response)=>{
    const servicesList = new Set(response.data.data.map(service => service.toUpperCase()));
    setServices([...servicesList]);

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

  

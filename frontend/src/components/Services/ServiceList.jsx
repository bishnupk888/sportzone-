import React from 'react'

import ServiceCard from './ServiceCard'


const ServiceList = () => {
  const services = []//fetch services

  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-[30px] lt-[30px] lg:mt-[55px]'>
        {services.map((item, index)=>{
            return <ServiceCard item={item} index={index} key={index}/>
        })}
    </div>
  )
}

export default ServiceList
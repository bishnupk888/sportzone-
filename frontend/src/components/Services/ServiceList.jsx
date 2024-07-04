import React, { useState } from 'react';
import ServiceCard from './ServiceCard';
import { useNavigate } from 'react-router-dom';

const ServiceList = ({ services }) => {
  const [visibleServicesCount, setVisibleServicesCount] = useState(10);
  const navigate = useNavigate()


  const handleViewMore = () => {
    setVisibleServicesCount((prevCount) => prevCount + 10);
  };

  const handleServiceClick = (serviceName) => {
    navigate(`/user/findtrainers?department=${encodeURIComponent(serviceName.toLowerCase())}`);
  };

  const visibleServices = services.slice(0, visibleServicesCount);

 

  return (
    <div className='text-white m-10'>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-[30px] lg:mt-[55px]'>
        {visibleServices.map((service, index) => (
          <ServiceCard service={service} index={index} key={index} onclick={handleServiceClick} />
        ))}
      </div>
      {visibleServicesCount < services.length && (
        <div className='flex justify-end mt-5'>
          <button
            onClick={handleViewMore}
            className='px-4 py-2 border border-redBorder text-white rounded-lg hover:text-redBorder'
          >
            View More
          </button>
        </div>
      )}
    </div>
  );
};

export default ServiceList;

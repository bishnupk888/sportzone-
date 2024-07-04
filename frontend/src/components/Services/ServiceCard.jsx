import React from 'react';

const ServiceCard = ({ service, onclick }) => {
  return (
    <div className="shadow-md rounded-lg overflow-hidden hover:scale-105 hover:border-b-4 hover:border-r-4 hover:border border-redBorder" onClick={() => { onclick(service) }}>
  <div className="p-6 flex bg-buttonBgColor hover:bg-zinc-950">
    <div className="flex justify-between w-full">
      <h3 className="text-lg font-semibold text-white">{service}</h3>
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 4.5l7.5 7.5-7.5 7.5m6-15l7.5 7.5-7.5 7.5" />
      </svg>
    </div>
  </div>
</div>

  );
};

export default ServiceCard;

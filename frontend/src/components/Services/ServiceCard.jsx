import React from 'react';

const ServiceCard = ({ title, description }) => {
  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden">
      <div className="p-6 flex items-center bg-white">
        <h1>hello</h1>
        {/* {icon && (
          <div className="w-12 h-12 flex-shrink-0 mr-4">
            <img src={icon} alt={`${title} icon`} className="w-full h-full object-cover" />
          </div>
        )} */}
        <div>
          <h3 className="text-lg font-semibold">{title}</h3>
          <p className="text-gray-600">{description}</p>
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;

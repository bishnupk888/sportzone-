import React from 'react';
import { FaArrowLeft } from 'react-icons/fa';

const BookingDetails = ({ booking, setViewBookingDetails }) => {
  if (!booking) {
    return <div>No booking details found</div>;
  }

  const formatDate = (dateStr) => {
    const dateObj = new Date(dateStr);
    const day = String(dateObj.getDate()).padStart(2, '0');
    const month = String(dateObj.getMonth() + 1).padStart(2, '0'); 
    const year = dateObj.getFullYear();
    return `${day}-${month}-${year}`;
  };

  return (
    <div className="fixed inset-0 z-40 bg-black bg-opacity-75 flex items-center justify-center">
      <div className="relative bg-black border border-gray-200 rounded-lg shadow-md p-10 text-white w-full max-w-3xl">
        <button onClick={() => setViewBookingDetails(false)} className="absolute top-4 left-4 bg-black border border-red-600 text-white px-4 py-2 rounded hover:scale-105 flex items-center">
          <FaArrowLeft className="mr-2" />
          Back
        </button>

        <h1 className="text-white lg:text-4xl md:text-3xl text-3xl py-4 font-bold text-center">BOOKING DETAILS</h1>

        <div className="text-lg text-textColor">
          <p>Trainer Name : <span className='text-xl'>{booking?.trainerId?.username}</span></p>
          <p>User Name : <span>{booking?.userId?.username}</span></p>
          <p>Booking Date : <span>{formatDate(booking?.bookingDate)}</span></p>
          <p>Session Date : <span>{formatDate(booking?.slots[0]?.date) }</span></p>
          <p>Slot Time : <span>{booking?.slots[0]?.startTime} :{booking?.slots[0]?.endTime} </span></p>
          <p>Booking ID : <span>{booking?._id}</span></p>
          <p>Slot ID : <span> {booking?.slots[0]?._id}</span></p>
          <p>Status : <span className={`${booking?.bookingStatus === 'success' ? 'text-green-500' : 'text-red-500'}`}>{booking.bookingStatus}</span></p>
          <p>Booking Amoount : <span>{booking?.bookingAmount}</span></p>
          <p>Location : <span>{booking?.location}</span></p>
        </div>

        <div className="mt-6 flex justify-end space-x-4">
        </div>
      </div>
    </div>
  );
};

export default BookingDetails;

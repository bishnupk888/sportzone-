import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import apiServices from '../../apiServices/apiServices';

const BookingDetails = ({cancelBooking , bookingId}) => {


  
  const navigate = useNavigate();
  const [bookingDetails, setBookingDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  const formatDate = (dateStr) => {
    const dateObj = new Date(dateStr);
    const day = String(dateObj.getDate()).padStart(2, '0');
    const month = String(dateObj.getMonth() + 1).padStart(2, '0'); // Months are 0-based
    const year = dateObj.getFullYear();
    return `${day}-${month}-${year}`;
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    apiServices.getUserBookingDetails(bookingId)
      .then((response) => {
        setBookingDetails(response.data.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [bookingId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!bookingDetails) {
    return <div>No booking details found</div>;
  }

  const { trainerId, bookingDate, slots, bookingAmount, bookingStatus } = bookingDetails;

  return (
    <div className="m-10">
      <button onClick={() => navigate(-1)} className="bg-black border border-red-600 text-white px-4 py-2 rounded mb-4 flex items-center">
        <FaArrowLeft className="mr-2" />
        Back
      </button>

      <h1 className='text-white text-4xl py-4 font-bold '>BOOKING DETAILS</h1>
           
      <div className="bg-black border border-gray-200 rounded-lg shadow-md p-6 text-white relative">
        <div className="flex items-center mb-6">
          <div className="relative h-20 w-20 border border-redBorder rounded-full">
            <img
              className="h-full w-full rounded-full object-cover object-center"
              src={trainerId.profileImage}
              alt=""
            />
          </div>
          <div className="ml-4 text-textColor">
            <h2 className="text-2xl font-bold text-highlightTextColor">{trainerId.username}</h2>
            <p className="text-gray-400">{trainerId.email}</p>
            <h1 className='text-xl'>Department: {trainerId.department}</h1>
          </div>
        </div>
        <div className="mb-4 text-textColor">
          <h3 className="text-xl font-semibold mb-2 text-white">Booking Information</h3>
          <p><strong>Booking Date:</strong> {formatDate(bookingDate)}</p>
          <p><strong>Booking Amount:</strong> ${bookingAmount}</p>
          <p><strong>Booking Status:</strong> {bookingStatus}</p>
        </div>
        <div className='text-textColor'>
          <h3 className="text-xl font-semibold mb-2 text-white">Session Information</h3>
          {slots.map((slot, index) => (
            <div key={index} className="mb-2">
              <p><strong>Date:</strong> {formatDate(slot.date)}</p>
              <p><strong>Time:</strong> {`${slot.startTime} - ${slot.endTime}`}</p>
            </div>
          ))}
        </div>
        <button onClick={() => cancelBooking(bookingId)} className="absolute bottom-6 right-6 bg-red-700 font-semibold border border-red-600 text-white hover:bg-red-500 hover:scale-105 px-4 py-2 rounded-md">
          Cancel Booking
        </button>
      </div>
    </div>
  );
};

export default BookingDetails;


// {booking.bookingStatus === 'success' && isCancellable(booking.bookingDate) ? (
//     <button
//       onClick={() => handleCancelBooking(booking._id)}
//       className="bg-red-600 border border-red-600 text-white px-2 py-2 rounded hover:scale-105"
//     >
//       Cancel
//     </button>
//   ):
//   <button
//       onClick={() => {booking.bookingStatus === 'cancelled' ? toast.error('already cancelled booking'):toast.error('cannot cancell booking after 30 minutes')}}
//       className="bg-red-900 border border-red-900 text-textColor px-2 py-2 rounded-lg hover:scale-105"
//     >
//       Cancel
//     </button>}
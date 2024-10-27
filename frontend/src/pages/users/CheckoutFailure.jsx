import React, { useEffect } from 'react';
import socket from '../../utils/socket';

const bookingDetailsString = localStorage.getItem('bookingNotificationData');
const bookingDetails = JSON.parse(bookingDetailsString);

const CheckoutFailure = () => {

    const formatDate = (dateStr) => {
        const dateObj = new Date(dateStr);
        const day = String(dateObj.getDate()).padStart(2, '0');
        const month = String(dateObj.getMonth() + 1).padStart(2, '0'); 
        const year = dateObj.getFullYear();
        return `${day}-${month}-${year}`;
      };
    
      useEffect(() => {
        if (bookingDetails) {
            
          console.log("booking success", bookingDetails)

          const { user, trainer, slot } = bookingDetails;
          
          const contentUser = `Booking Failed!\n Your booking for slot on ${formatDate(slot?.date)} - from ${slot?.startTime} to ${slot?.endTime} is failed. please try again.`;
    
          socket.emit("notification", {
            content: contentUser,
            receiverId: user?._id,
            sender: `Trainer, ${trainer?.username}`
          });
          localStorage.removeItem('bookingNotificationData');
        }
      }, []);
  return (
    <div className="bg-black h-screen flex items-center justify-center">
      <div className="bg-black p-6 md:mx-auto">
        <svg
          viewBox="0 0 24 24"
          className="text-red-600 w-16 h-16 mx-auto my-6"
        >
          <path
            fill="currentColor"
            d="M12 0C5.372 0 0 5.372 0 12s5.372 12 12 12 12-5.372 12-12S18.628 0 12 0zm5.6 16.2a1 1 0 0 1-1.4 0L12 11.4 7.8 16.2a1 1 0 1 1-1.4-1.4l4.2-4.2-4.2-4.2a1 1 0 0 1 1.4-1.4L12 9.6l4.2-4.2a1 1 0 1 1 1.4 1.4l-4.2 4.2 4.2 4.2a1 1 0 0 1 0 1.4z"
          />
        </svg>
        <div className="text-center">
          <h3 className="md:text-2xl text-base text-white font-semibold">
            Payment Failed
          </h3>
          <p className="text-textColor my-2">
            Unfortunately, your payment could not be processed at this time.
          </p>
          <p>Please try again or contact support if the issue persists.</p>
          <div className="py-10 text-center">
            <a
              href={bookingDetails ?`/user/view-trainer/${bookingDetails?.trainer?._id}`:`/`}
              className="px-8 bg-red-600 hover:bg-red-500 text-white font-semibold py-3 mx-4"
            >
              Back to trainer profile
            </a>
            <a
              href="/"
              className="px-8 bg-gray-600 hover:bg-gray-500 text-white font-semibold py-3 mx-4"
            >
              GO BACK HOME
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutFailure;
import React, { useEffect } from 'react';
import socket from '../../utils/socket';
import apiServices from '../../apiServices/apiServices'

const bookingDetailsString = localStorage.getItem('bookingNotificationData');
const bookingDetails = JSON.parse(bookingDetailsString);


const CheckoutSuccess = () => {

  const formatDate = (dateStr) => {
    const dateObj = new Date(dateStr);
    const day = String(dateObj.getDate()).padStart(2, '0');
    const month = String(dateObj.getMonth() + 1).padStart(2, '0'); 
    const year = dateObj.getFullYear();
    return `${day}-${month}-${year}`;
  };

  useEffect(() => {
    if (bookingDetails) {
      console.log(bookingDetails)
      apiServices.bookingSuccess(bookingDetails).then((response)=>{
        console.log(response.data)
        console.log("call to booking success")
      })
      console.log("booking success", bookingDetails)
      const { user, trainer, slot} = bookingDetails;

      const contentUser = `Your booking for slot on ${formatDate(slot?.date)} - from ${slot?.startTime} to ${slot?.endTime} is successful.`;
      const contentTrainer = `Slot added on ${formatDate(slot?.date)} - from ${slot?.startTime} to ${slot?.endTime} is booked by ${user?.username}.`;


      socket.emit("notification", {
        content: contentUser,
        receiverId: user?._id,
        sender: `Trainer, ${trainer?.username}`
      });

      socket.emit("notification", {
        content: contentTrainer,
        receiverId: trainer?._id,
        sender: 'Admin regarding Booking'
      });
      localStorage.removeItem('bookingNotificationData');
    }
  }, []);

  return (
    <div className="bg-black h-screen flex items-center justify-center">
      <div className="bg-black p-6 md:mx-auto">
        <svg
          viewBox="0 0 24 24"
          className="text-green-600 w-16 h-16 mx-auto my-6"
        >
          <path
            fill="currentColor"
            d="M12,0A12,12,0,1,0,24,12,12.014,12.014,0,0,0,12,0Zm6.927,8.2-6.845,9.289a1.011,1.011,0,0,1-1.43.188L5.764,13.769a1,1,0,1,1,1.25-1.562l4.076,3.261,6.227-8.451A1,1,0,1,1,18.927,8.2Z"
          />
        </svg>
        <div className="text-center">
          <h3 className="md:text-2xl text-base text-white font-semibold">
            Payment Done!
          </h3>
          <p className="text-textColor my-2">
            Thank you for completing your secure online payment.
          </p>
          <p>Have a great day!</p>
          <div className="py-10 text-center">
            <a
              href="/"
              className="px-12 bg-green-600 hover:bg-green-500 text-white font-semibold py-3"
            >
              GO BACK HOME
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutSuccess;

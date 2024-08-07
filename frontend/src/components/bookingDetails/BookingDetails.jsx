import React, { useState, useEffect } from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import { HiOutlineDownload } from 'react-icons/hi';
import { PDFDownloadLink } from '@react-pdf/renderer';
import ConfirmationModal from '../popupComponents/ConfirmationModal';
import apiServices from '../../apiServices/apiServices';
import Invoice from '../../components/pdfComponents/InvoiceComponent'; 
import { useSelector } from 'react-redux';

const BookingDetails = ({ cancelBooking, bookingId, setViewBookingDetails, bookingData }) => {
  const [bookingDetails, setBookingDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { userId, userName } = useSelector((state) => state.user);

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleConfirmAction = () => {
    cancelBooking(bookingId);
    setModalOpen(false);
  };

  const isFutureSlot = (slot) => {
    const slotDate = new Date(slot.date);
    const [hours, minutes] = slot.startTime.split(':').map(Number);
    slotDate.setHours(hours, minutes);

    return slotDate > new Date();
  };

  const formatDate = (dateStr) => {
    const dateObj = new Date(dateStr);
    const day = String(dateObj.getDate()).padStart(2, '0');
    const month = String(dateObj.getMonth() + 1).padStart(2, '0');
    const year = dateObj.getFullYear();
    return `${day}-${month}-${year}`;
  };

  useEffect(() => {
    apiServices.getUserBookingDetails(bookingId)
      .then((response) => {
        setBookingDetails(response.data.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [bookingId, bookingData]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!bookingDetails) {
    return <div>No booking details found</div>;
  }

  const { trainerId, bookingDate, slots, bookingAmount, bookingStatus } = bookingDetails;

  return (
    <div className="mx-10 lg:mx-60 md:mx-40 w-full h-auto">
      <button onClick={() => setViewBookingDetails(false)} className="bg-black border border-red-600 text-white px-4 py-2 rounded mb-4 flex items-center hover:scale-105">
        <FaArrowLeft className="mr-2" />
        Back
      </button>

      <h1 className='text-white lg:text-4xl md:text-3xl text-3xl py-4 font-bold'>BOOKING DETAILS</h1>

      <div className="bg-black border border-gray-200 rounded-lg shadow-md p-10 text-white relative">
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
          <p><strong>Booking Amount:</strong> {bookingAmount} Rs.</p>
          <p><strong>Booking Status:</strong> <span className={`font-semibold text-lg ${bookingStatus === 'cancelled' ? 'text-red-500' : 'text-green-500'}`}>{bookingStatus}</span></p>
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
        
        <div className="flex justify-end items-center mt-4 gap-2">
          <div className="relative">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="bg-blue-700 font-semibold border border-blue-600 text-white hover:bg-blue-500 hover:scale-105 px-4 py-2 rounded-md flex items-center"
            >
              <HiOutlineDownload size={20} className="mr-2" />
              Invoice file
            </button>
            {dropdownOpen && (
              <div className="absolute top-12 bg-black border border-red-900 rounded-lg shadow-lg">
                <PDFDownloadLink document={<Invoice trainer={trainerId} username={userName} bookingDate={formatDate(bookingDate)} slot={slots} slotDate={formatDate(slots[0].date)} bookingAmount={bookingAmount} />} fileName='sportzone-invoice.pdf'>
                  {({ loading }) => (
                    <button
                      disabled={loading}
                      className="block px-4 py-2 text-gray-200 hover:bg-gray-800 w-full text-left text-[13px]"
                    >
                      {loading ? 'Preparing PDF...' : 'Download PDF'}
                    </button>
                  )}
                </PDFDownloadLink>
                {/* <button
                  onClick={() => exportToExcel(bookingDetails)}
                  className="block px-4 py-2 text-gray-200 hover:bg-gray-800 w-full text-left text-[13px]"
                >
                  Download Excel
                </button> */}
              </div>
            )}
          </div>
          {bookingStatus !== 'cancelled' && isFutureSlot(slots[0]) && (
            <button
              onClick={() => setModalOpen(true)}
              className="bg-red-700 font-semibold border border-red-600 text-white hover:bg-red-500 hover:scale-105 px-4 py-2 rounded-md"
            >
              Cancel Booking
            </button>
          )}
        </div>
      </div>
      {modalOpen && <ConfirmationModal
        isOpen={modalOpen}
        onClose={handleCloseModal}
        onConfirm={handleConfirmAction}
        question={"Need To Cancel Your Order?"}
        message={"!! Cancellation cannot be undone and 20% of total amount will be deducted"}
      />}
    </div>
  );
};

export default BookingDetails;

import React, { useEffect, useState } from 'react';
import axiosInstance from '../../axiosInstance/axiosInstance';
import { useSelector } from 'react-redux';

const Bookings = () => {
  const [bookingData, setBookingData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const trainerId = useSelector((state) => state.user.userId);

  const formatDate = (dateStr) => {
    const dateObj = new Date(dateStr);
    const day = String(dateObj.getDate()).padStart(2, '0');
    const month = String(dateObj.getMonth() + 1).padStart(2, '0'); // Months are 0-based
    const year = dateObj.getFullYear();
    return `${day}-${month}-${year}`;
  };

  useEffect(() => {
    axiosInstance.get(`/api/trainers/bookings/${trainerId}`)
      .then((response) => {
        const transformedData = response.data.data.map((booking) => ({
          ...booking,
          bookingDate: formatDate(booking.bookingDate),
        }));
        setBookingData(transformedData);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [trainerId]);

  const totalPages = Math.ceil(bookingData.length / itemsPerPage);

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const getPaginatedData = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return bookingData.slice(startIndex, endIndex);
  };

  return (
    <div className='m-10'>
      <h1 className='text-white text-2xl my-4'>BOOKING DETAILS</h1>
      <div className="overflow-hidden rounded-lg border border-gray-200 shadow-md">
        <table className="w-full border-collapse bg-black text-left text-sm text-gray-500">
          <thead className="bg-black text-textColor">
            <tr>
              <th scope="col" className="px-6 py-4 font-medium">User Name</th>
              <th scope="col" className="px-6 py-4 font-medium">Date</th>
              <th scope="col" className="px-6 py-4 font-medium">Slot</th>
              <th scope="col" className="px-6 py-4 font-medium">Amount</th>
              <th scope="col" className="px-6 py-4 font-medium">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 border-t border-gray-100">
            {getPaginatedData().map((booking, index) => (
              booking.slots.map((slot, slotIndex) => (
                <tr key={`${index}-${slotIndex}`} className="hover:bg-buttonBgColor">
                  <th className="flex gap-3 px-6 py-4 font-normal text-gray-900">
                    <div className="relative h-10 w-10">
                      <img
                        className="h-full w-full rounded-full object-cover object-center"
                        src={booking.userId.profileImage}
                        alt=""
                      />
                    </div>
                    <div className="text-sm">
                      <div className="font-medium text-gray-400">{booking.userId.username}</div>
                      <div className="text-gray-600">{booking.userId.email}</div>
                    </div>
                  </th>
                  <td className="px-6 py-4">{booking.bookingDate}</td>
                  <td className="px-6 py-4">{`${slot.startTime} - ${slot.endTime}`}</td>
                  <td className="px-6 py-4">{booking.bookingAmount}</td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center gap-1 rounded-full bg-green-50 px-2 py-1 text-xs font-semibold text-green-600">
                      <span className="h-1.5 w-1.5 rounded-full bg-green-600"></span>
                      {booking.bookingStatus}
                    </span>
                  </td>
                </tr>
              ))
            ))}
          </tbody>
        </table>
        
      </div>
      <div className="flex justify-between items-center p-4">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="bg-black border border-red-600 text-white px-4 py-2 rounded disabled:bg-black disabled:text-gray-700 disabled:border-black "
          >
            Previous
          </button>
          <span className="text-white">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="bg-black border border-green-600 text-white px-4 py-2 rounded disabled:bg-black disabled:text-gray-700 disabled:border-black "
          >
            Next
          </button>
        </div>
    </div>
  );
};

export default Bookings;

import React, { useEffect, useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import axiosInstance from '../../axiosInstance/axiosInstance';

const Bookings = () => {
  const [bookingsData, setBookingData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const itemsPerPage = 10;

  useEffect(() => {
    axiosInstance.get('/api/admin/bookings')
      .then((response) => {
        console.log(response.data);
        setBookingData(response.data.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setError(err);
        setLoading(false);
      });
  }, []);

  const formatDate = (dateStr) => {
    const dateObj = new Date(dateStr);
    const day = String(dateObj.getDate()).padStart(2, '0');
    const month = String(dateObj.getMonth() + 1).padStart(2, '0'); // Months are 0-based
    const year = dateObj.getFullYear();
    return `${day}-${month}-${year}`;
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const handleSort = () => {
    // Sorting logic here
  };

  const renderBookings = () => {
    return bookingsData
      .filter(booking =>
        booking.userId?.username?.toLowerCase().includes(searchQuery.toLowerCase())
      )
      .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
      .map((booking, index) => (
        booking.slots.map((slot, slotIndex) => (
          <tr key={`${booking._id}-${slotIndex}`} className="border-b dark:border-gray-700">
            {slotIndex === 0 && (
              <>
                <td className="p-3 border border-redBorder" rowSpan={booking.slots.length}>{(currentPage - 1) * itemsPerPage + index + 1}</td>
                <td className="p-3 border border-redBorder" rowSpan={booking.slots.length}>{booking._id}</td>
                <td className="p-3 border border-redBorder" rowSpan={booking.slots.length}>{booking.userId?.username || 'N/A'}</td>
                <td className="p-3 border border-redBorder" rowSpan={booking.slots.length}>{formatDate(booking.bookingDate)}</td>
              </>
            )}
            <td className="p-3 border border-redBorder">{new Date(slot.date).toLocaleDateString('en-GB')}</td>
            <td className="p-3 border border-redBorder">{`${slot.startTime}-${slot.endTime}`}</td>
            <td className="p-3 border border-redBorder">{booking.trainerId ? booking.trainerId.username : 'N/A'}</td>
            {slotIndex === 0 && (
              <td className={`p-3 border border-redBorder ${
                booking.status === 'Completed' ? 'bg-green-50 text-green-600 border-green-600' : 
                booking.status === 'Cancelled' ? 'bg-red-50 text-red-600 border-red-600' : ''
              }`} rowSpan={booking.slots.length}>
                {booking.bookingStatus}
              </td>
            )}
          </tr>
        ))
      ));
  };

  const totalPages = Math.ceil(bookingsData.length / itemsPerPage);

  return (
    <div className='bg-black w-auto h-[100%]'>
      <div className="overflow-x-auto m-4 p-4 border border-redBorder bg-black text-textColor rounded-md mx-[100px] md:mx-[30px]">
        <div className="flex justify-between items-center mb-4">
          <div></div>
          <div className="relative">
            <input 
              type="search" 
              placeholder="Search bookings..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="px-3 py-2 border border-redBorder rounded bg-black text-textColor pl-10"
            />
            <FaSearch className="absolute left-3 top-2.5 text-textColor" />
            {/* <button className='bg-black border border-redBorder' onClick={handleSort}>
              Sort
            </button> */}
          </div>
        </div>
        {loading ? (
          <div className="text-center py-4">Loading...</div>
        ) : error ? (
          <div className="text-center py-4">Error loading bookings</div>
        ) : (
          <table className="min-w-full bg-white dark:bg-black">
            <thead>
              <tr className="border dark:border-redBorder bg-transparent text-textColor">
                <th className="p-3 border border-redBorder">SL No</th>
                <th className="p-3 border border-redBorder">Booking ID</th>
                <th className="p-3 border border-redBorder">Athlete Name</th>
                <th className="p-3 border border-redBorder">Booked On</th>
                <th className="p-3 border border-redBorder">Session Date</th>
                <th className="p-3 border border-redBorder">Slot Time</th>
                <th className="p-3 border border-redBorder">Trainer Name</th>
                <th className="p-3 border border-redBorder">Status</th>
              </tr>
            </thead>
            <tbody>
              {bookingsData.length > 0 ? (
                renderBookings()
              ) : (
                <tr>
                  <td colSpan="9" className="text-center py-4">
                    No bookings found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}

        <div className="flex justify-between items-center mt-4">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-4 py-2 text-sm font-semibold text-textColor border border-redBorder rounded disabled:opacity-50 dark:bg-black"
          >
            Previous
          </button>
          <span className="font-semibold text-textColor">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-4 py-2 text-sm font-semibold text-textColor border border-redBorder rounded disabled:opacity-50 dark:bg-black"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Bookings;

import React, { useEffect, useState } from 'react';
import axiosInstance from '../../axiosInstance/axiosInstance';
import { useSelector } from 'react-redux';
import { FaSearch } from 'react-icons/fa';

const MyBookings = () => {
  const [bookingData, setBookingData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');
  const itemsPerPage = 10;
  const userId = useSelector((state) => state.user.userId);

  const formatDate = (dateStr) => {
    const dateObj = new Date(dateStr);
    const day = String(dateObj.getDate()).padStart(2, '0');
    const month = String(dateObj.getMonth() + 1).padStart(2, '0'); // Months are 0-based
    const year = dateObj.getFullYear();
    return `${day}-${month}-${year}`;
  };

  useEffect(() => {
    axiosInstance.get(`/api/users/mybookings/${userId}`)
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
  }, [userId]);

  const totalPages = Math.ceil(bookingData.length / itemsPerPage);

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const handleSort = () => {
    const sortedData = [...bookingData].sort((a, b) => {
      const dateA = new Date(a.bookingDate);
      const dateB = new Date(b.bookingDate);
      return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
    });
    setBookingData(sortedData);
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };

  const filteredData = bookingData.filter(booking =>
    booking.trainerId.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
    booking.trainerId.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const paginatedData = filteredData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div className='m-10'>
      <div className="flex justify-between items-center mb-4">
        <h1 className='text-white text-2xl my-4'>MY BOOKING</h1>
        <div className="flex items-center">
          <div className="relative mr-4">
            <input
              type="search"
              placeholder="Search bookings..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="px-3 py-2 border border-redBorder rounded bg-black text-textColor pl-10"
            />
            <FaSearch className="absolute left-3 top-2.5 text-textColor" />
          </div>
          <button
            onClick={handleSort}
            className="bg-black border border-redBorder text-textColor px-4 py-2 rounded"
          >
            Sort by Date
          </button>
        </div>
      </div>
      <div className="overflow-hidden rounded-lg border border-gray-200 shadow-md">
        <table className="w-full border-collapse bg-black text-left text-sm text-gray-500">
          <thead className="bg-black text-textColor">
            <tr>
              
              <th scope="col" className="px-6 py-4 font-medium">Trainer Name</th>
              <th scope="col" className="px-6 py-4 font-medium">Booked On</th>
              <th scope="col" className="px-6 py-4 font-medium">Date</th>
              <th scope="col" className="px-6 py-4 font-medium">Slot</th>
              <th scope="col" className="px-6 py-4 font-medium">Amount</th>
              <th scope="col" className="px-6 py-4 font-medium">Booking Status</th>
              <th scope="col" className="px-6 py-4 font-medium">Training Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 border-t border-gray-100">
            {paginatedData.length > 0 ? (
              paginatedData.map((booking, index) => (
                booking.slots.map((slot, slotIndex) => (
                  <tr key={`${index}-${slotIndex}`} className="hover:bg-buttonBgColor">
                    <th className="flex gap-3 px-6 py-4 font-normal text-gray-900">
                      <div className="relative h-10 w-10">
                        <img
                          className="h-full w-full rounded-full object-cover object-center"
                          src={booking.trainerId.profileImage}
                          alt=""
                        />
                      </div>
                      <div className="text-sm">
                        <div className="font-medium text-gray-400">{booking.trainerId.username}</div>
                        <div className="text-gray-600">{booking.trainerId.email}</div>
                      </div>
                    </th>
                    <td className="px-6 py-4">{booking.bookingDate}</td>
                    <td className="px-6 py-4">{formatDate(slot.date)}</td>
                    <td className="px-6 py-4">{`${slot.startTime} - ${slot.endTime}`}</td>
                    <td className="px-6 py-4">{booking.bookingAmount}</td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs font-semibold border ${booking.bookingStatus === 'Completed'
                          ? 'bg-black text-white border border-green-600'
                          : booking.bookingStatus === 'Cancelled'
                            ? 'bg-black text-white border border-red-600'
                            : 'bg-black text-white'
                        }`}
                      >
                        <span className="h-1.5 w-1.5 rounded-full bg-green-600"></span>
                        {booking.bookingStatus}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs font-semibold ${new Date(slot.date).getTime() > Date.now()
                          ? 'bg-black text-white border border-green-600'
                          : 'bg-black text-white border border-red-600'
                        }`}
                      >
                        <span className="h-1.5 w-1.5 rounded-full bg-green-600"> </span>
                        {new Date(slot.date).getTime() > Date.now() ? 'Upcoming' : 'Past'}
                      </span>
                    </td>
                  </tr>
                ))
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center py-4">No bookings found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div className="flex justify-between items-center p-4">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="bg-black border border-red-600 text-white px-4 py-2 rounded disabled:bg-black disabled:text-gray-700 disabled:border-black"
        >
          Previous
        </button>
        <span className="text-white">
          Page {currentPage} of {Math.ceil(filteredData.length / itemsPerPage)}
        </span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === Math.ceil(filteredData.length / itemsPerPage)}
          className="bg-black border border-green-600 text-white px-4 py-2 rounded disabled:bg-black disabled:text-gray-700 disabled:border-black"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default MyBookings;


import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { FaSearch } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import BookingDetails from '../../components/bookingDetails/BookingDetails';
import apiServices from '../../apiServices/apiServices';

const MyBookings = () => {
  const [bookingData, setBookingData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');
  const [viewBookingDetails, setViewBookingDetails] = useState(false);
  const [selectedBookingId, setSelectedBookingId] = useState(null);
  const [paginatedData, setPaginatedData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

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
  window.scrollTo(0, 0);
    apiServices.getUserBookings(userId)
      .then((response) => {
        const transformedData = response.data.data.map((booking) => ({
          ...booking,
          bookingDate: formatDate(booking.bookingDate),
        }));
        setBookingData(transformedData);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [userId]);

  const totalPages = Math.ceil(bookingData.length / itemsPerPage);

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const compareCurrentTimeWithSlot = (slotEndTime) => {
    const currentTime = new Date();
    const [endHours, endMinutes] = slotEndTime.split(':');
    const slotEndDateTime = new Date(currentTime);
    slotEndDateTime.setHours(parseInt(endHours, 10));
    slotEndDateTime.setMinutes(parseInt(endMinutes, 10));
    slotEndDateTime.setSeconds(0);
    slotEndDateTime.setMilliseconds(0);

    return slotEndDateTime > currentTime;
  };

  const isSlotUpcoming = (slotDate, slotEndTime) => {
    const currentDate = new Date();
    const slotDateTime = new Date(slotDate);

    if (slotDateTime > currentDate) {
      return true;
    } else if (slotDateTime.toDateString() === currentDate.toDateString()) {
      return compareCurrentTimeWithSlot(slotEndTime);
    } else {
      return false;
    }
  };

  const isCancellable = (bookingDate) => {
    const bookingTime = new Date(bookingDate);
    const currentTime = new Date();
    const timeDifference = (currentTime - bookingTime) / (1000 * 60); // Time difference in minutes
    return timeDifference <= 30; // Check if within 30 minutes
  };

  const handleSort = () => {
    const sortedData = [...bookingData].sort((a, b) => {
      const dateA = new Date(a.slots[0].date); // Accessing the first slot's date
      const dateB = new Date(b.slots[0].date);
      return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
    });
    
    setBookingData(sortedData);
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };
  

  useEffect(() => {
    // Check if bookingData is defined and is an array
    if (Array.isArray(bookingData)) {
      // Filter booking data based on search query
      const fData = bookingData.filter(booking =>
        booking.trainerId?.username?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        booking.trainerId?.email?.toLowerCase().includes(searchQuery.toLowerCase())
      );
  
      // Calculate the current page slice
      const startIndex = (currentPage - 1) * itemsPerPage;
      const endIndex = currentPage * itemsPerPage;
      const pData = fData.slice(startIndex, endIndex);
  
      // Update state with filtered and paginated data
      setFilteredData(fData);
      setPaginatedData(pData);
    }
  }, [bookingData, searchQuery, currentPage]);
  

  const handleCancelBooking = (bookingId) => {
   
    apiServices.cancelUserBooking(bookingId) 
      .then((response) => {
        console.log(response);
        if (response.data.success) {
          setBookingData(prevData => prevData.map(booking =>
            booking._id === bookingId ? { ...booking, bookingStatus: 'cancelled' } : booking
          ));
          
          toast.success('booking cancelled successfully');
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <>
      <div className='m-10'>
        <div className="flex justify-between items-center mb-4">
          <h1 className='text-white text-2xl my-4'>MY BOOKING</h1>
          <div className="flex items-center">
            <div className="flex mr-4">
              <FaSearch className="relative left-7 top-3 text-textColor" />
              <input
                type="search"
                placeholder="Search bookings..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="px-3 py-2 border border-redBorder rounded bg-black text-textColor pl-10"
              />
            </div>
            <button
              onClick={handleSort}
              className="bg-black border border-redBorder text-textColor px-4 py-2 rounded"
            >
              Sort by session Date
            </button>
          </div>
        </div>
        <div className="overflow-hidden rounded-lg border border-gray-200 shadow-md">
          <table className="w-full border-collapse bg-black text-left text-sm text-gray-500">
            <thead className="bg-black text-textColor">
              <tr>
                <th scope="col" className="px-6 py-4 font-medium">Trainer Name</th>
                <th scope="col" className="px-6 py-4 font-medium">Booked On</th>
                <th scope="col" className="px-6 py-4 font-medium">session date</th>
                <th scope="col" className="px-6 py-4 font-medium">Booking Status</th>
                <th scope="col" className="px-6 py-4 font-medium">Training Status</th>
                <th scope="col" className="px-6 py-4 font-medium">Actions</th>
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
                      <td className="px-6 py-4">{formatDate(booking.slots[0].date)}</td>

                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs font-semibold border ${booking.bookingStatus === 'success'
                            ? 'bg-black text-white border border-green-600'
                            : booking.bookingStatus === 'cancelled' || booking.bookingStatus === 'failed'
                              ? 'bg-black text-white border border-red-600'
                              : 'bg-black text-white'
                          }`}
                        >
                          <span className={`h-1.5 w-1.5 rounded-full ${(booking.bookingStatus === 'cancelled' || booking.bookingStatus === 'failed') ? 'bg-red-600' : 'bg-green-600'} `}></span>
                          {booking.bookingStatus}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs font-semibold ${booking.bookingStatus === 'cancelled' ? 'bg-black text-white border border-red-600' : (isSlotUpcoming(slot.date, slot.endTime)
                            ? 'bg-black text-white border border-green-600'
                            : 'bg-black text-white border border-red-600'
                          )}`}
                        >
                          <span className={`h-1.5 w-1.5 rounded-full ${booking.bookingStatus === 'cancelled' ? 'bg-red-600' : (isSlotUpcoming(slot.date, slot.endTime) ? 'bg-green-600' : 'bg-red-600')}`}> </span>
                          {booking.bookingStatus === 'cancelled' ? 'cancelled' : (isSlotUpcoming(slot.date, slot.endTime) ? 'Upcoming' : 'Completed')}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <button
                          onClick={() => {
                            setViewBookingDetails(true);
                            setSelectedBookingId(booking._id);
                          }}
                          className="bg-green-700 border border-green-900 text-white font-semibold px-2 py-2 rounded-lg hover:scale-105"
                        >
                          Details
                        </button>
                      </td>
                    </tr>
                  ))
                ))
              ) : (
                <tr>
                  <td colSpan="8" className="text-center py-4">No bookings found</td>
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
      {viewBookingDetails && (
        <div className="fixed mt-20 inset-0 z-50 flex items-center justify-center bg-black bg-opacity-100">
          <BookingDetails
            bookingId={selectedBookingId}
            cancelBooking={handleCancelBooking}
            setViewBookingDetails={setViewBookingDetails}
            bookingData={bookingData}
            onClose={() => setViewBookingDetails(false)}
          />
        </div>
      )}
    </>
  );
};

export default MyBookings;

import React, { useEffect, useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import BookingDetails from '../../components/admin/BookingDetails';
import apiServices from '../../apiServices/apiServices';
import { useNavigate } from 'react-router-dom';

const Bookings = () => {
  const [bookingsData, setBookingData] = useState([]);
  const [bookingDetails,setBookingDetails] = useState(null)
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const [viewBookingDetails, setViewBookingDetails] = useState(false)
  const itemsPerPage = 10;

  const userRole = localStorage.getItem('adminData');
  

  const navigate = useNavigate()
    useEffect(()=>{
      if(!userRole){
        navigate('/admin/login')
        toast.info("please login for more")       
      }
    },[userRole])

  useEffect(() => {
    apiServices.getAllBookings()
      .then((response) => {
        setBookingData(response.data.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
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

  const handleViewBookingDetails = (booking)=>{
    setBookingDetails(booking)
    setViewBookingDetails(true)
  }

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
          <tr key={`${booking?._id}-${slotIndex}`} className="border-b dark:border-gray-700">
            {slotIndex === 0 && (
              <>
                <td className="p-3 border border-redBorder" rowSpan={booking.slots.length}>{(currentPage - 1) * itemsPerPage + index + 1}</td>
                <td className="p-3 border border-redBorder" rowSpan={booking.slots.length}>{booking?._id}</td>
                <td className="p-3 border border-redBorder" rowSpan={booking.slots.length}>{booking?.userId?.username || 'N/A'}</td>
                <td className="p-3 border border-redBorder" rowSpan={booking.slots.length}>{formatDate(booking?.bookingDate)}</td>
              </>
            )}
            <td className="p-3 border border-redBorder">{booking?.trainerId ? booking?.trainerId?.username : 'N/A'}</td>
            <td className={`p-3 border border-redBorder ${booking?.bookingStatus === 'success' ? 'text-green-500' : 'text-red-500'}`}>{booking?.bookingStatus ? booking?.bookingStatus : 'N/A'}</td>

            {slotIndex === 0 && (
              <td className=' flex p-3 border border-redBorder  justify-center'>
                <button
            onClick={() => handleViewBookingDetails(booking)}
            className={`mr-2 px-3 py-1 rounded transition-transform duration-200 hover:scale-110 text-white border border-green-500 bg-green-900`}
          >
            Details
          </button>
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
        <div>
            <h1 className='text-2xl font-bold pl-10'>BOOKINGS</h1>
          </div>
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
                <th className="p-3 border border-redBorder">Trainer Name</th>
                <th className="p-3 border border-redBorder">status</th>

                <th className="p-3 border border-redBorder">More</th>
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
      {viewBookingDetails && <BookingDetails booking={bookingDetails}  setViewBookingDetails={setViewBookingDetails} />}
    </div>
  );
};

export default Bookings;

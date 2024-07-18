import React, { useEffect, useState } from "react";

import { useSelector } from "react-redux";
import BookingDetailsTrainer from "../../components/bookingDetails/BookingDetailsTrainer";
import apiServices from "../../apiServices/apiServices";

const Bookings = () => {
  const [bookingData, setBookingData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [viewBookingDetails, setViewBookingDetails] = useState(false);
  const [selectedBookingId, setSelectedBookingId] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");
  const [slotSortOrder, setSlotSortOrder] = useState("asc");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const itemsPerPage = 10;
  const trainerId = useSelector((state) => state.user.userId);

  const formatDate = (dateStr) => {
    const dateObj = new Date(dateStr);
    const day = String(dateObj.getDate()).padStart(2, "0");
    const month = String(dateObj.getMonth() + 1).padStart(2, "0"); // Months are 0-based
    const year = dateObj.getFullYear();
    return `${day}-${month}-${year}`;
  };

  useEffect(() => {
    apiServices
      .getTrainerBookings(trainerId)
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
  }, [trainerId]);

  const totalPages = Math.ceil(bookingData.length / itemsPerPage);

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };
  const compareCurrentTimeWithSlot = (slotEndTime) => {
    const currentTime = new Date();
    const endTime = new Date(slotEndTime);

    return endTime > currentTime;
  };

  const getPaginatedData = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return bookingData.slice(startIndex, endIndex);
  };

  const sortBookingsByDate = () => {
    const sortedData = [...bookingData].sort((a, b) => {
      const dateA = new Date(a.bookingDate);
      const dateB = new Date(b.bookingDate);

      if (sortOrder === "asc") {
        return dateA - dateB;
      } else {
        return dateB - dateA;
      }
    });

    setBookingData(sortedData);
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    setIsDropdownOpen(false); // Close dropdown after sorting
  };

  const sortBookingsBySlotDate = () => {
    const sortedData = [...bookingData].sort((a, b) => {
      const slotDateA = new Date(a.slots[0].date); // Assuming you want to sort by the first slot's date
      const slotDateB = new Date(b.slots[0].date);

      if (slotSortOrder === "asc") {
        return slotDateA - slotDateB;
      } else {
        return slotDateB - slotDateA;
      }
    });

    setBookingData(sortedData);
    setSlotSortOrder(slotSortOrder === "asc" ? "desc" : "asc");
    setIsDropdownOpen(false); // Close dropdown after sorting
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

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <>
      <div className="m-10">
        <h1 className="text-white text-2xl my-4">BOOKING DETAILS</h1>
        {getPaginatedData().length > 0 ? (<>
          <div className="relative flex justify-end mb-4">
            <button
              onClick={toggleDropdown}
              className="bg-black border border-red-600 text-white px-4 py-2 rounded hover:scale-105"
            >
              Sort By
            </button>
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-black border border-gray-700 rounded-lg shadow-lg z-10">
                <button
                  onClick={sortBookingsByDate}
                  className="block w-full text-left px-4 py-2 text-white hover:bg-gray-700"
                >
                  Booking Date {sortOrder === "asc" ? " ⬆ " : " ⬇ "}
                </button>
                <button
                  onClick={sortBookingsBySlotDate}
                  className="block w-full text-left px-4 py-2 text-white hover:bg-gray-700"
                >
                  Slot Date {slotSortOrder === "asc" ? " ⬆ " : " ⬇ "}
                </button>
              </div>
            )}
          </div>
          <div className="overflow-hidden rounded-lg border border-gray-200 shadow-md">
          <table className="w-full border-collapse bg-black text-left text-sm text-gray-500">
            <thead className="bg-black text-textColor">
              <tr>
                <th scope="col" className="px-6 py-4 font-medium">
                  User Name
                </th>
                <th scope="col" className="px-6 py-4 font-medium">
                  Booking Date
                </th>
                <th scope="col" className="px-6 py-4 font-medium">
                  Slot
                </th>
                <th scope="col" className="px-6 py-4 font-medium">
                  Amount
                </th>
                <th scope="col" className="px-6 py-4 font-medium">
                  Status
                </th>
                <th scope="col" className="px-6 py-4 font-medium">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 border-t border-gray-100">
              {getPaginatedData().map((booking, index) =>
                booking.slots.map((slot, slotIndex) => (
                  <tr
                    key={`${index}-${slotIndex}`}
                    className="hover:bg-buttonBgColor"
                  >
                    <th className="flex gap-3 px-6 py-4 font-normal text-gray-900">
                      <div className="relative h-10 w-10">
                        <img
                          className="h-full w-full rounded-full object-cover object-center"
                          src={booking?.userId?.profileImage}
                          alt=""
                        />
                      </div>
                      <div className="text-sm">
                        <div className="font-medium text-gray-400">
                          {booking?.userId?.username}
                        </div>
                        <div className="text-gray-600">
                          {booking?.userId?.email}
                        </div>
                      </div>
                    </th>
                    <td className="px-6 py-4">{booking?.bookingDate}</td>
                    <td className="px-6 py-4">{`${formatDate(slot?.date)} ${
                      slot?.startTime
                    } - ${slot?.endTime}`}</td>
                    <td className="px-6 py-4">{booking?.bookingAmount}</td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs font-semibold ${
                          booking?.bookingStatus === "cancelled"
                            ? "bg-black text-white border border-red-600"
                            : isSlotUpcoming(slot.date, slot.endTime)
                            ? "bg-black text-white border border-green-600"
                            : "bg-black text-white border border-red-600"
                        }`}
                      >
                        <span
                          className={`h-1.5 w-1.5 rounded-full ${
                            booking.bookingStatus === "cancelled"
                              ? "bg-red-600"
                              : isSlotUpcoming(slot?.date, slot?.endTime)
                              ? "bg-green-600"
                              : "bg-red-600"
                          } }   `}
                        >
                          {" "}
                        </span>
                        {booking?.bookingStatus === "cancelled"
                          ? "cancelled"
                          : isSlotUpcoming(slot?.date, slot?.endTime)
                          ? "Upcoming"
                          : "Completed"}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => {
                          setViewBookingDetails(true);
                          setSelectedBookingId(booking?._id);
                        }}
                        className="bg-green-700 border border-green-900 text-white font-semibold px-2 py-2 rounded-lg hover:scale-105"
                      >
                        Details
                      </button>
                    </td>
                  </tr>
                ))
              )}
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
        {viewBookingDetails && (
          <div className="fixed mt-20 inset-0 z-50 flex items-center justify-center bg-black bg-opacity-100">
            <BookingDetailsTrainer
              bookingId={selectedBookingId}
              setViewBookingDetails={setViewBookingDetails}
              bookingData={bookingData}
              onClose={() => setViewBookingDetails(false)} 
            />
          </div>
        )}
        
        </>):(
          <h3 className="text-redBorder "> No bookings made or No booking data to display!!</h3>
        )}
      </div>
    </>
  );
};

export default Bookings;

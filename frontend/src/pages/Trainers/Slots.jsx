import React, { useEffect, useState } from "react";
import TimePicker from "react-time-picker";
import CustomDatePicker from "../../components/datePicker/CustomDatePicker";
import "react-time-picker/dist/TimePicker.css";
import "react-clock/dist/Clock.css";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import EditSlot from "../../components/popupComponents/EditSlot";
import apiServices from "../../apiServices/apiServices";

const Slots = () => {
  const trainerId = useSelector((state) => state.user.userId);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [startTime, setStartTime] = useState("10:00");
  const [endTime, setEndTime] = useState("11:00");
  const [slots, setSlots] = useState([]);
  const [count, setCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [slotsPerPage] = useState(10); 
  const [sortByDateAsc, setSortByDateAsc] = useState(true); 
  const [viewEditSlot, setViewEditSlot] = useState(false);
  const [slotToEdit, setSlotToEdit] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true)
    const fetchData = async () => {
      try {
        if (!trainerId) return;
        const response = await apiServices.getAllSlots(trainerId);
        setSlots(response.data.data);
        setIsLoading(false)
      } catch (error) {
        console.error("Error fetching slots:", error);
        setIsLoading(false)
      }
    };

    fetchData();
  }, [trainerId, count]);

  const isValidDate = (date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date >= today;
  };

  const isOverlapping = (newSlot) => {
    return slots.some((slot) => {
      if (
        new Date(slot.date).toDateString() ===
        new Date(newSlot.date).toDateString()
      ) {
        return (
          (newSlot.startTime >= slot.startTime &&
            newSlot.startTime < slot.endTime) ||
          (newSlot.endTime > slot.startTime &&
            newSlot.endTime <= slot.endTime) ||
          (newSlot.startTime <= slot.startTime &&
            newSlot.endTime >= slot.endTime)
        );
      }
      return false;
    });
  };

  const isValidTime = (start, end) => {
    const [startHour, startMinute] = start.split(":").map(Number);
    const [endHour, endMinute] = end.split(":").map(Number);
    return (
      startHour < endHour || (startHour === endHour && startMinute < endMinute)
    );
  };

  const handleAddSlot = () => {
    const now = new Date();
    const selectedDateTime = new Date(selectedDate);
    const [startHour, startMinute] = startTime.split(":").map(Number);
    const [endHour, endMinute] = endTime.split(":").map(Number);
    selectedDateTime.setHours(startHour, startMinute);

    if (!isValidDate(selectedDate)) {
      toast.warning("Please select a date in the future.");
      return;
    }

    if (selectedDateTime <= now) {
      toast.warning("Please select a time in the future.");
      return;
    }

    if (!isValidTime(startTime, endTime)) {
      toast.warning("Start time should be less than end time.");
      return;
    }

    const newSlot = {
      date: selectedDate,
      startTime,
      endTime,
      trainerId,
    };

    if (isOverlapping(newSlot)) {
      toast.warning("Already have slots in the selected time period.");
      return;
    }

    apiServices
      .addNewSlot(newSlot)
      .then((addedSlot) => {
        setSlots([addedSlot, ...slots]);
        setCount((prevCount) => prevCount + 1);
        toast.success("Slot added successfully!");
      })
      .catch((error) => {
        toast.error("Error adding slot. Please try again.");
        console.error("Failed to add slot", error);
      });

    // Clear the form fields after adding the slot
    setSelectedDate(new Date());
    setStartTime("10:00");
    setEndTime("11:00");
  };

  const handleDeleteSlot = async (slotId) => {
    try {
      const response = await apiServices.deleteSlot(slotId);
      setSlots(slots.filter((slot) => slot._id !== slotId));
      setCount(count + 1);
      toast.success("Slot deleted successfully!");
    } catch (error) {
      toast.error("Error deleting slot. Please try again.");
      console.error("Failed to delete slot", error);
    }
  };

  const handleDeleteBookedSlot = () => {
    toast.warning("Cannot delete already booked slot");
  };

  const handleCloseEditSlot = () => {
    setViewEditSlot(false);
  };

  const handleEditClick = (slot) => {
    setSlotToEdit(slot);
    setViewEditSlot(true);
  };

  const handleEditSlot = (slotId, updatedSlotData) => {
    const now = new Date();
    const selectedDateTime = new Date(updatedSlotData.date);
    const [startHour, startMinute] = updatedSlotData.startTime
      .split(":")
      .map(Number);
    const [endHour, endMinute] = updatedSlotData.endTime.split(":").map(Number);
    selectedDateTime.setHours(startHour, startMinute);

    if (!isValidDate(updatedSlotData.date)) {
      toast.warning("Please select a date in the future.");
      return;
    }

    if (selectedDateTime <= now) {
      toast.warning("Please select a time in the future.");
      return;
    }

    if (!isValidTime(updatedSlotData.startTime, updatedSlotData.endTime)) {
      toast.warning("Start time should be less than end time.");
      return;
    }

    if (isOverlapping(updatedSlotData)) {
      toast.warning("Already have slots in the selected time period.");
      return;
    }

    apiServices
      .editSlot(slotId, updatedSlotData)
      .then((response) => {
        const updatedSlots = slots.map((slot) =>
          slot._id === slotId ? { ...slot, ...updatedSlotData } : slot
        );
        setSlots(updatedSlots);
        toast.success("Slot edited successfully!");
      })
      .catch((error) => {
        toast.error("Error editing slot. Please try again.");
        console.error("Failed to edit slot", error);
      });

    // Clear the form fields after editing the slot
    setSelectedDate(new Date());
    setStartTime("10:00");
    setEndTime("11:00");
  };

  // Helper function to check if a slot is expired
  const isSlotExpired = (slot) => {
    if (!slot.date || !slot.endTime) {
      return false; // or handle this case as needed
    }
    const slotDateTime = new Date(slot.date);
    const [endHour, endMinute] = slot.endTime.split(":").map(Number);
    slotDateTime.setHours(endHour, endMinute);

    return slotDateTime < new Date();
  };

  // Sorting function for dates
  const sortSlotsByDate = () => {
    const sortedSlots = [...slots].sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      return sortByDateAsc ? dateA - dateB : dateB - dateA;
    });
    setSortByDateAsc(!sortByDateAsc); // Toggle sorting order
    setSlots(sortedSlots);
  };

  // Pagination logic
  const indexOfLastSlot = currentPage * slotsPerPage;
  const indexOfFirstSlot = indexOfLastSlot - slotsPerPage;
  const currentSlots = slots.slice(indexOfFirstSlot, indexOfLastSlot);

  // Change page
  const paginate = (pageNumber) => {
    if (
      pageNumber >= 1 &&
      pageNumber <= Math.ceil(slots.length / slotsPerPage)
    ) {
      setCurrentPage(pageNumber);
    }
  };

  return (
    <>
      <div className="mx-10 mt-10">
        <h1 className="text-white text-3xl mb-5">Time Slots</h1>
        <div className="p-5 rounded-lg bg-buttonBgColor">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mb-5">
            <div>
              <p className="text-white mb-1">Select Date</p>
              <CustomDatePicker
                selectedDate={selectedDate}
                setSelectedDate={setSelectedDate}
              />
            </div>
            <div>
              <p className="text-white mb-2">Starting Time</p>
              <TimePicker
                onChange={setStartTime}
                value={startTime}
                className="w-full h-10 text-white bg-black"
                clockClassName="bg-black text-white"
                format="hh:mm a"
                clearIcon={null}
                disableClock
              />
            </div>
            <div>
              <p className="text-white mb-2">Ending Time</p>
              <TimePicker
                onChange={setEndTime}
                value={endTime}
                className="w-full h-10 text-white bg-black"
                clockClassName=" "
                format="hh:mm a"
                clearIcon={null}
                disableClock
              />
            </div>
            <div className="flex items-center justify-center pt-7">
              <button
                onClick={handleAddSlot}
                className="bg-green-800 text-white py-2 px-4 rounded-md hover:bg-green-700 hover:scale-95"
              >
                Add Slot
              </button>
            </div>
          </div>

          {currentSlots.length > 0 ? (
            <div className="mt-5">
              <div className="flex justify-end mb-3 mr-10">
                <button
                  onClick={sortSlotsByDate}
                  className="bg-gray-800 text-white py-2 px-4 rounded-md hover:bg-gray-700"
                >
                  Sort By Date
                </button>
              </div>
              <h2 className="text-white text-2xl mb-3">Added Slots</h2>
              <table className="min-w-full bg-black text-white rounded-xl shadow-md border border-redBorder ">
                <thead>
                  <tr className="bg-black border border-redBorder ">
                    <th className="px-6 py-4 text-left text-sm font-medium tracking-wider uppercase">
                      Date
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-medium tracking-wider uppercase">
                      Time Slot
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-medium tracking-wider uppercase">
                      Status
                    </th>
                    <th className="px-6 py-4 text-sm font-medium tracking-wider uppercase"></th>
                  </tr>
                </thead>
                <tbody>
                  {currentSlots.map((slot, index) => (
                    <tr
                      key={index}
                      className="hover:bg-buttonBgColor transition duration-300 ease-in-out"
                    >
                      <td className="px-6 py-4 text-sm font-medium">
                        {new Date(slot.date).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 text-sm font-medium">
                        {slot.startTime} - {slot.endTime}
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex items-center gap-1 rounded-full bg-black px-2 py-1 text-xs font-semibold 
            ${
              isSlotExpired(slot) && !slot.isBooked
                ? "text-red-600 border border-red-600"
                : slot.isBooked
                ? "text-yellow-600 border border-yellow-600"
                : "text-green-600 border border-green-600"
            }`}
                        >
                          <span
                            className={`h-1.5 w-1.5 rounded-full 
            ${
              isSlotExpired(slot) && !slot.isBooked
                ? "bg-red-500"
                : slot.isBooked
                ? "bg-yellow-500"
                : "bg-green-400"
            }`}
                          ></span>
                          {isSlotExpired(slot) && !slot.isBooked
                            ? "Expired"
                            : slot.isBooked
                            ? "Booked"
                            : "Available"}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm font-medium text-right">
                        {!slot.isBooked ? (
                          <>
                            <button
                              onClick={() => handleDeleteSlot(slot._id)}
                              className="bg-red-500 hover:bg-red-700 text-white py-2 px-4 rounded transition duration-300 ease-in-out"
                            >
                              Delete
                            </button>
                            <button
                              onClick={() => handleEditClick(slot)}
                              className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded transition duration-300 ease-in-out ml-2"
                            >
                              Edit
                            </button>
                          </>
                        ) : (
                          <button
                            onClick={() => handleDeleteBookedSlot()}
                            className="bg-red-500 hover:bg-red-700 text-white py-2 px-4 rounded transition duration-300 ease-in-out"
                          >
                            Delete
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* Pagination component */}
              <div className="mt-5 flex justify-center">
                <nav className="bg-black px-4 py-3 flex items-center justify-between sm:px-6">
                  <div className="hidden sm:block">
                    <p className="text-sm text-white">
                      Showing {indexOfFirstSlot + 1} to{" "}
                      {Math.min(indexOfLastSlot, slots.length)} of{" "}
                      {slots.length} entries
                    </p>
                  </div>
                  <div className="flex-1 flex justify-between">
                    <button
                      onClick={() => paginate(currentPage - 1)}
                      className={`ml-4 relative inline-flex items-center px-4 py-2 border border-redBorder text-sm font-medium rounded-md text-white bg-buttonBgColor hover:bg-red-700 focus:outline-none ${
                        currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
                      }`}
                      disabled={currentPage === 1}
                    >
                      Previous
                    </button>
                    <button
                      onClick={() => paginate(currentPage + 1)}
                      className={`ml-2 relative inline-flex items-center px-4 py-2 border border-redBorder text-sm font-medium rounded-md text-white bg-buttonBgColor hover:bg-green-700 focus:outline-none ${
                        indexOfLastSlot >= slots.length
                          ? "opacity-50 cursor-not-allowed"
                          : ""
                      }`}
                      disabled={indexOfLastSlot >= slots.length}
                    >
                      Next
                    </button>
                  </div>
                </nav>
              </div>
            </div>
          ) : isLoading ? (
            <>
              <h3
                className="text-center py-4 text-white"
                style={{
                  animation: "fade 2s infinite",
                }}
              >
                Loading...
              </h3>
              <style>
                {`
                  @keyframes fade {
                  0% { opacity: 0; }
                  50% { opacity: 1; }
                  100% { opacity: 0; }
                  }
                  `}
              </style>
            </>
          ) : (
            <h3 className="text-red-600 text-center"> No slots added!! </h3>
          )}
        </div>
      </div>
      <div>
        {viewEditSlot && (
          <EditSlot
            isOpen={viewEditSlot}
            onRequestClose={handleCloseEditSlot}
            slot={slotToEdit}
            onSave={handleEditSlot}
          />
        )}
      </div>
    </>
  );
};

export default Slots;

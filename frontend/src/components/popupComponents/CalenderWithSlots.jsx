import React, { useEffect, useState } from 'react';
import { format, startOfMonth, endOfMonth, startOfWeek, endOfWeek, addMonths, subMonths, addDays, isSameDay, isSameMonth, isBefore } from 'date-fns';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SlotsInDate from './SlotsInDate';
import { useNavigate } from 'react-router-dom';


const CalendarWithSlots = ({ slots , setIsOpen,trainerFee , trainerId }) => {
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const [viewBookingSlots, setViewBookingSlots] = useState(false);
    const [selectedDate, setSelectedDate] = useState([]);
    const [slotAvailableDates, setSlotsAvailableDate] = useState([])
    
   
    
    const [selectedSlots,setSelectedSlots] = useState([])

    const totalAmount =  trainerFee * selectedSlots.length
    const navigate = useNavigate()

    console.log(slots);

    const formatDate = (date) => {
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Month is zero-indexed
        const year = date.getFullYear().toString();
        return `${day}/${month}/${year}`;
      };

    useEffect(()=>{
        const AvailableSlotsDates = slots.map(slot => formatDate(new Date(slot.date)));
        setSlotsAvailableDate(AvailableSlotsDates)
    },[slots])



    


    const nextMonth = () => {
        setCurrentMonth(addMonths(currentMonth, 1));
    };

    const prevMonth = () => {
        const previousMonth = subMonths(currentMonth, 1);
        if (!isBefore(previousMonth, new Date(new Date().getFullYear(), new Date().getMonth(), 1))) {
            setCurrentMonth(previousMonth);
        }
    };
    

    const handleDateClick = (date) => {
        console.log(date);
        const today = new Date();
        today.setHours(0, 0, 0, 0); // Clear the time part to compare only the date

        if (isBefore(date, today)) {
            toast.warn('Cannot select past dates!');
        } else {
            setViewBookingSlots(true);
            setSelectedDate(date);
        }
    };

    // const getSelectedSlots = (slotsSelected)=>{
    //         setSelectedSlot(slotsSelected)
    // }
    
    
    const handleBookNowClick = async ()=>{
    
       console.log("clicked booknow");
    //    const selectedSlots = [/* your selected slots data */];
       
       console.log("total amount :",totalAmount);

  navigate('/user/checkout', {
    state: { 
        selectedSlots: selectedSlots,
        totalAmount: totalAmount,
        trainerId:trainerId },
  })
       console.log("slot selected: ",selectedSlots);
    }
    

    const renderHeader = () => {
        return (
            <div className="px-4 flex items-center justify-between">
                <span tabIndex="0" className="focus:outline-none text-base font-bold dark:text-gray-100 text-gray-800">
                    {format(currentMonth, 'MMMM yyyy')}
                </span>
                <div className="flex items-center">
                    <button
                        aria-label="calendar backward"
                        onClick={prevMonth}
                        className="focus:text-gray-400 hover:text-gray-400 text-gray-800 dark:text-gray-100"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="icon icon-tabler icon-tabler-chevron-left"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            fill="none"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                            <polyline points="15 6 9 12 15 18" />
                        </svg>
                    </button>
                    <button
                        aria-label="calendar forward"
                        onClick={nextMonth}
                        className="focus:text-gray-400 hover:text-gray-400 ml-3 text-gray-800 dark:text-gray-100"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="icon icon-tabler icon-tabler-chevron-right"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            fill="none"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                            <polyline points="9 6 15 12 9 18" />
                        </svg>
                    </button>
                </div>
            </div>
        );
    };

    const renderDays = () => {
        const days = [ 'Su','Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa',];

        return (
            <thead>
                <tr>
                    {days.map((day, index) => (
                        <th key={index}>
                            <div className="w-full flex justify-center mb-4 ">
                                <p className="text-lg font-large text-center text-white dark:text-white">{day}</p>
                            </div>
                        </th>
                    ))}
                </tr>
            </thead>
        );
    };

    const renderCells = () => {
        const monthStart = startOfMonth(currentMonth);
        const monthEnd = endOfMonth(currentMonth);
        const startDate = startOfWeek(monthStart);
        const endDate = endOfWeek(monthEnd);
        const today = new Date();
    
        const rows = [];
        let days = [];
        let day = startDate;
        let formattedDate = '';
    
        while (day <= endDate) {
            for (let i = 0; i < 7; i++) {
                formattedDate = format(day, 'd');
                const cloneDay = day;
                const isMuted = isBefore(cloneDay, today) && !isSameDay(cloneDay, today);
                const isIncludeSlots = slotAvailableDates.includes(formatDate(new Date(cloneDay)));
                const isCurrentMonth = isSameMonth(day, monthStart);
                
                days.push(
                    <td key={day} className={`p-2`}>
                        <div
                            onClick={() => handleDateClick(cloneDay)}
                            className={`cursor-pointer flex w-full justify-center ${isSameDay(day, today)
                                ? 'text-highlightTextColor bg-blue-600 rounded-md'
                                : 'text-gray-800 dark:text-gray-100 hover:bg-gray-100 hover:text-black rounded-md'
                                } ${isIncludeSlots && 'border border-red-500'}`}
                            style={{
                                visibility: isCurrentMonth ? 'visible' : 'hidden',
                                color: isMuted ? '#4a4a4a' : undefined,
                                cursor: isMuted ? 'not-allowed' : 'pointer'
                            }}
                        >
                            <p className={`text-base font-medium ${isSameDay(day, today) ? 'text-white' : ''}`}>
                                {formattedDate}
                            </p>
                        </div>
                    </td>
                );
                day = addDays(day, 1);
            }
            rows.push(<tr key={day}>{days}</tr>);
            days = [];
        }
        return <tbody>{rows}</tbody>;
    };
    

    return (
        <div>
            <div className="flex flex-col md:flex-row justify-center p-20 border border-green-400 bg-black">

                {/* Left side */}
                <div className="max-w-sm w-full shadow-lg md:mr-4 mb-4 md:mb-0">
                    <h1 className='text-white pb-4 text-2xl'> SELECT DATE AND SLOTS </h1>
                    <div className="md:p-8 p-5 dark:bg-black bg-black rounded-lg border border-redBorder">
                        {renderHeader()}
                        <div className="flex items-center justify-between pt-8 overflow-x-auto">
                            <table className="w-full">
                                {renderDays()}
                                {renderCells()}
                            </table>
                        </div>
                    </div>
                </div>

                {/* Right side (popup) */}
                {viewBookingSlots && (
                    <div className="flex-col md:px-4 px-2 py-4 z-50 m-12 md:w-auto border border-redBorder ">
                        <div className="bg-gray-900 shadow-lg rounded-t-md p-4 ">
                            <SlotsInDate date={selectedDate} slots={slots} setSelectedSlots={setSelectedSlots} selectedSlots={selectedSlots}  />
                        </div>
                    </div>
                )}
            </div>
            <div className="absolute bottom-6 right-10 space-x-4">
                <button onClick={(e)=>{
                    e.preventDefault()
                    setIsOpen(false)}} className=" text-white px-4 py-2 rounded-lg text-lg hover:scale-110 hover:text-red-600  border border-red-600 bg-red-700 hover:bg-black">Cancel</button>
                {viewBookingSlots&&
                <button onClick={handleBookNowClick} className="text-white px-4 py-2 rounded-lg text-lg hover:scale-110 hover:text-green-500  border border-green-600 bg-green-600 hover:bg-black">Book Now</button>
                }
            </div>

        </div>



    );
};

export default CalendarWithSlots;

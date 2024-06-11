import React, { useState, useEffect } from 'react';

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const generateCalendar = (year, month) => {
    const firstDayOfMonth = new Date(year, month, 1);
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDayOfWeek = firstDayOfMonth.getDay();

    const calendarDays = [];

    // Empty days before the first day of the month
    for (let i = 0; i < firstDayOfWeek; i++) {
      calendarDays.push(<div key={`empty-${i}`} />);
    }

    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const isToday = year === new Date().getFullYear() && month === new Date().getMonth() && day === new Date().getDate();
      calendarDays.push(
        <div
          key={day}
          className={`text-center py-2 border cursor-pointer ${isToday ? 'bg-blue-500 text-white' : ''}`}
          onClick={() => handleDateClick(new Date(year, month, day))}
        >
          {day}
        </div>
      );
    }

    return calendarDays;
  };

  const handleDateClick = (date) => {
    setSelectedDate(date.toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }));
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const prevMonth = () => {
    const newDate = new Date(currentDate.setMonth(currentDate.getMonth() - 1));
    setCurrentDate(newDate);
  };

  const nextMonth = () => {
    const newDate = new Date(currentDate.setMonth(currentDate.getMonth() + 1));
    setCurrentDate(newDate);
  };

  useEffect(() => {
    generateCalendar(currentDate.getFullYear(), currentDate.getMonth());
  }, [currentDate]);

  return (
    <div className="bg-gray-100 flex items-center justify-center h-screen">
      <div className="lg:w-7/12 md:w-9/12 sm:w-10/12 mx-auto p-4">
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="flex items-center justify-between px-6 py-3 bg-gray-700">
            <button onClick={prevMonth} className="text-white">Previous</button>
            <h2 className="text-white">{monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}</h2>
            <button onClick={nextMonth} className="text-white">Next</button>
          </div>
          <div className="grid grid-cols-7 gap-2 p-4" id="calendar">
            {daysOfWeek.map((day, index) => (
              <div key={index} className="text-center font-semibold">{day}</div>
            ))}
            {generateCalendar(currentDate.getFullYear(), currentDate.getMonth())}
          </div>
          {modalOpen && (
            <div id="myModal" className="modal fixed inset-0 flex items-center justify-center z-50">
              <div className="modal-overlay absolute inset-0 bg-black opacity-50" onClick={closeModal}></div>
              <div className="modal-container bg-white w-11/12 md:max-w-md mx-auto rounded shadow-lg z-50 overflow-y-auto">
                <div className="modal-content py-4 text-left px-6">
                  <div className="flex justify-between items-center pb-3">
                    <p className="text-2xl font-bold">Selected Date</p>
                    <button id="closeModal" className="modal-close px-3 py-1 rounded-full bg-gray-200 hover:bg-gray-300 focus:outline-none focus:ring" onClick={closeModal}>✕</button>
                  </div>
                  <div id="modalDate" className="text-xl font-semibold">{selectedDate}</div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Calendar;

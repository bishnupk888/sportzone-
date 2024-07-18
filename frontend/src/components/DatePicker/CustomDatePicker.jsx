import React, { useState, useEffect, useRef } from 'react';
import 'tailwindcss/tailwind.css';

const MONTH_NAMES = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const CustomDatePicker = ({ selectedDate, setSelectedDate }) => {
  const [showDatepicker, setShowDatepicker] = useState(false);
  const [month, setMonth] = useState(0);
  const [year, setYear] = useState(0);
  const [noOfDays, setNoOfDays] = useState([]);
  const [blankDays, setBlankDays] = useState([]);
  const datepickerValue = useRef('');

  useEffect(() => {
    initDate();
    getNoOfDays();
  }, []);

  useEffect(() => {
    getNoOfDays();
  }, [month, year]);

  const initDate = () => {
    const today = new Date(selectedDate);
    setMonth(today.getMonth());
    setYear(today.getFullYear());
    datepickerValue.current = today.toDateString();
  };

  const getNoOfDays = () => {
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const dayOfWeek = new Date(year, month).getDay();
    const blankdaysArray = [];
    for (let i = 1; i <= dayOfWeek; i++) {
      blankdaysArray.push(i);
    }
    const daysArray = [];
    for (let i = 1; i <= daysInMonth; i++) {
      daysArray.push(i);
    }
    setBlankDays(blankdaysArray);
    setNoOfDays(daysArray);
  };

  const getDateValue = (date) => {
    const selectedDate = new Date(year, month, date);
    if (selectedDate < new Date()) {
      return; // Do nothing if the selected date is in the past
    }
    datepickerValue.current = selectedDate.toDateString();
    setSelectedDate(selectedDate);
    setShowDatepicker(false);
  };

  const isToday = (date) => {
    const today = new Date();
    const d = new Date(year, month, date);
    return today.toDateString() === d.toDateString();
  };

  const isPastDate = (date) => {
    const today = new Date();
    const d = new Date(year, month, date);
    return d < today;
  };

  return (
    <div className="relative">
      <input
        type="text"
        readOnly
        value={datepickerValue.current}
        onClick={() => setShowDatepicker(!showDatepicker)}
        className="w-full pl-4 pr-10 py-3 leading-none rounded-lg shadow-sm focus:outline-none focus:shadow-outline text-white font-medium bg-black"
        placeholder="Select date"
      />
      <div className="absolute top-0 right-0 px-3 py-2">
        <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      </div>

      {showDatepicker && (
        <div className="bg-black mt-12 rounded-lg shadow p-4 absolute top-0 left-0 border border-redBorder" style={{ width: '17rem' }}>
          <div className="flex justify-between items-center mb-2">
            <div>
              <span className="text-lg font-bold text-white">{MONTH_NAMES[month]}</span>
              <span className="ml-1 text-lg text-white font-normal">{year}</span>
            </div>
            <div>
              <button
                type="button"
                className="transition ease-in-out duration-100 inline-flex cursor-pointer hover:bg-redBorder p-1 rounded-full"
                disabled={month === 0}
                onClick={() => setMonth(month - 1)}
              >
                <svg className="h-6 w-6 text-gray-500 inline-flex" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                type="button"
                className="transition ease-in-out duration-100 inline-flex cursor-pointer hover:bg-redBorder p-1 rounded-full"
                disabled={month === 11}
                onClick={() => setMonth(month + 1)}
              >
                <svg className="h-6 w-6 text-white inline-flex" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>

          <div className="flex flex-wrap mb-3 -mx-1">
            {DAYS.map((day, index) => (
              <div key={index} style={{ width: '14.26%' }} className="px-1">
                <div className="text-white font-medium text-center text-xs">{day}</div>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap -mx-1">
            {blankDays.map((_, index) => (
              <div key={index} style={{ width: '14.28%' }} className="text-center border p-1 border-transparent text-sm"></div>
            ))}
            {noOfDays.map((date, index) => (
              <div key={index} style={{ width: '14.28%' }} className="px-1 mb-1">
                <div
                  onClick={() => getDateValue(date)}
                  className={`cursor-pointer text-center text-sm leading-none rounded-full leading-loose transition ease-in-out duration-100 ${
                    isToday(date) ? 'bg-blue-500 text-white' : isPastDate(date) ? 'text-gray-500 cursor-not-allowed' : 'text-white hover:bg-blue-200'
                  }`}
                >
                  {date}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomDatePicker;

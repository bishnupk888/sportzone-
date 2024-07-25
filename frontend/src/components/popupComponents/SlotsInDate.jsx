import React, { useEffect, useState } from 'react';
import { format } from 'date-fns';

const SlotsInDate = ({ slots, date, setSelectedSlots, selectedSlots }) => {
  const [slotsInSelectedDate, setSlotsInSelectedDate] = useState([]);

  useEffect(() => {
    const formattedDate = format(new Date(date), 'dd-MM-yyyy');
    const filteredSlots = slots.filter((slot) => format(new Date(slot.date), 'dd-MM-yyyy') === formattedDate);
    setSlotsInSelectedDate(filteredSlots);
  }, [slots, date]);

  const getFormattedTime = (timeString) => {
    const [hour, minute] = timeString.split(':');
    const formattedHour = parseInt(hour) % 12 || 12; 
    const period = parseInt(hour) >= 12 ? 'PM' : 'AM';
    return `${formattedHour}:${minute} ${period}`;
  };

  const handleRowClick = (slot) => {
    setSelectedSlots((prevSelectedSlots) => {
      if (prevSelectedSlots.includes(slot)) {
        return []; 
      } else {
        return [slot]; 
      }
    });
  };

  return !slotsInSelectedDate.length ? (
    <div className="mt-2 border-b border-redBorder min-w-full">
      <div className="text-red-800">
        <h1>No Slots Available on the selected date :</h1>
        {format(new Date(date), 'dd-MM-yyyy')}
      </div>
    </div>
  ) : (
    <div className="mt-2 border-b border-redBorder">
      <div className="text-red-800 bg-gray-900">
        <h1>Slots Available on {format(new Date(date), 'dd-MM-yyyy')}</h1>
      </div>
      <div className="max-h-80 overflow-y-auto overflow-x-hidden">
        <table className="min-w-full bg-black text-white rounded-xl shadow-md">
          <thead className="sticky top-0 bg-gray-900">
            <tr>
              <th className="p-4 text-left text-sm font-medium uppercase">Sl No.</th>
              <th className="p-4 text-left text-sm font-medium uppercase">Starting Time</th>
              <th className="p-4 text-left text-sm font-medium uppercase">Ending Time</th>
              <th className="p-4 text-left text-sm font-medium uppercase">Select</th>
            </tr>
          </thead>
          <tbody>
            {slotsInSelectedDate.map((slot, idx) => (
              <tr
                key={slot._id}
                className={`hover:bg-buttonBgColor transition duration-300 ease-in-out ${selectedSlots.includes(slot) ? 'bg-gray-700' : ''}`}
                onClick={() => handleRowClick(slot)}
              >
                <td className="p-4 text-sm font-medium">{idx + 1}</td>
                <td className="p-4 text-sm font-medium">{getFormattedTime(slot.startTime)}</td>
                <td className="p-4 text-sm font-medium">{getFormattedTime(slot.endTime)}</td>
                <td className="p-4 text-sm font-medium">
                  <input
                    type="checkbox"
                    checked={selectedSlots.includes(slot)}
                    onChange={(e) => e.stopPropagation()} 
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SlotsInDate;



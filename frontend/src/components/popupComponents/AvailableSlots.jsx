import React, { useState } from 'react';

const AvailableSlots = ({ slots }) => {
    const [selectedSlot, setSelectedSlot] = useState(null);
    const now = new Date();

    const filteredSlots = slots.filter(slot => {
        const slotDate = new Date(slot.date);
        const [startHour, startMinute] = slot.startTime.split(':').map(Number);
        slotDate.setHours(startHour, startMinute, 0, 0); // Set the slot start time
        return slotDate >= now;
    });

    return (
        <div className='mt-2 border-b border-redBorder'>
            {filteredSlots.length > 0 ? (
                <>
                    <div className='text-red-800'>
                        <h1> *Showing up to 10 Upcoming Slots from all slots </h1>
                    </div>
                    <div className="max-h-80 overflow-y-auto overflow-x-hidden">
                        <table className="min-w-full bg-black text-white rounded-xl shadow-md">
                            <thead className="sticky top-0 position-fixed">
                                <tr className="bg-gray-900 position-fixed">
                                    <th className="p-4 text-left text-sm font-medium uppercase">Date</th>
                                    <th className="p-4 text-left text-sm font-medium uppercase">Time Slot</th>
                                    <th className="pl-20 text-left text-sm font-medium uppercase">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredSlots.sort((a, b) => new Date(a.date) - new Date(b.date)).slice(0, 10).map((slot, index) => (
                                    <tr key={index} className="hover:bg-buttonBgColor transition duration-300 ease-in-out border-b border-redBorder ">
                                        <td className="p-4 text-sm font-medium">{new Date(slot.date).toLocaleDateString('en-GB')}</td>
                                        <td className="text-sm font-medium">{slot.startTime} - {slot.endTime}</td>
                                        <td className={`p-4 text-sm font-medium text-right pr-16 text-green-700 hover:text-green-500'}`}>
                                            AVAILABLE
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </>
            ) : (
                <div>
                    <h1 className='text-red-500'> No Slots Available </h1>
                </div>
            )}
        </div>
    );
};

export default AvailableSlots;

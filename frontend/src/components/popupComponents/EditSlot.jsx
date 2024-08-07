import React, { useState } from 'react';
import Modal from 'react-modal';
import CustomDatePicker from '../datePicker/CustomDatePicker';
import TimePicker from 'react-time-picker';

const EditSlot = ({ isOpen, onRequestClose, slot, onSave }) => {
  const [selectedDate, setSelectedDate] = useState(slot.date);
  const [startTime, setStartTime] = useState(slot.startTime);
  const [endTime, setEndTime] = useState(slot.endTime);

  const handleSave = () => {
    const updatedSlotData = {
      date: selectedDate,
      startTime,
      endTime,
    };
    onSave(slot._id, updatedSlotData);
    
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className="fixed inset-0 flex items-center justify-center z-50"
      overlayClassName="fixed inset-0 bg-black bg-opacity-50"
    >
      <div className="bg-black p-6 rounded-md w-full max-w-lg mx-auto">
        <h2 className="text-white text-2xl mb-4">Edit Slot</h2>
        <div className="grid grid-cols-1 gap-5 mb-5">
          <div className="col-span-1 relative z-50 ">
            <p className="text-white mb-1">Select Date</p>
            <CustomDatePicker 
              selectedDate={selectedDate}
              setSelectedDate={setSelectedDate}
            />
          </div>
          <div className="grid grid-cols-2 gap-5 col-span-1">
            <div className="relative z-20">
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
            <div className="relative z-20 ">
              <p className="text-white mb-2">Ending Time</p>
              <TimePicker
                onChange={setEndTime}
                value={endTime}
                className="w-full h-10 text-white bg-black"
                clockClassName="bg-black text-white"
                format="hh:mm a"
                clearIcon={null}
                disableClock
              />
            </div>
          </div>
        </div>
        <div className="flex justify-end gap-3">
          <button
            onClick={onRequestClose}
            className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-700 hover:scale-95"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="bg-green-800 text-white py-2 px-4 rounded-md hover:bg-green-700 hover:scale-95"
          >
            Save Changes
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default EditSlot;

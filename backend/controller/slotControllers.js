const User = require('../model/userModel');
const Trainer = require('../model/trainerModel');
const Slot = require('../model/slotModel');



const updateSlots = async (slotIds) => {
  try {
    const updatePromises = slotIds.map(id => 
      Slot.findByIdAndUpdate(id, { isBooked: true }, { new: true })
    );
    const updatedSlots = await Promise.all(updatePromises);
    console.log('Slots updated:', updatedSlots);
  } catch (error) {
    console.error('Error updating slots when booking:', error);
  }
};

module.exports ={
    updateSlots
}
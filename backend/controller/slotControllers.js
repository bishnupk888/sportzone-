const User = require('../model/userModel');
const Trainer = require('../model/trainerModel');
const Slot = require('../model/slotModel');



const updateSlots = async (slotIds) => {
  try {
    const updatePromises = slotIds.map(id => 
      Slot.findByIdAndUpdate(id, { isBooked: true }, { new: true })
    );
    const updatedSlots = await Promise.all(updatePromises);
  } catch (error) {
    console.error('Error updating slots when booking:', error);
  }
};

const updateCancelledSlots = async (slotIds) => {
  try {
    const updatePromises = slotIds.map(id => 
      Slot.findByIdAndUpdate(id, { isBooked: false }, { new: true })
    );
    const updatedSlots = await Promise.all(updatePromises);
  } catch (error) {
    console.error('Error updating cancelled slots :', error);
  }
};

module.exports ={
    updateSlots,
    updateCancelledSlots
}
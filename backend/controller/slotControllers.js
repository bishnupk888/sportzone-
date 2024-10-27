const User = require('../model/userModel');
const Trainer = require('../model/trainerModel');
const Slot = require('../model/slotModel');



const updateSlots = async (slotIds) => {
  try {
    let updatedSlots; // Declare updatedSlots here to access it later

    if (Array.isArray(slotIds)) {
      const updatePromises = slotIds.map(id => 
        Slot.findByIdAndUpdate(id, { isBooked: true }, { new: true })
      );
      updatedSlots = await Promise.all(updatePromises);
    } else {
      updatedSlots = await Slot.findByIdAndUpdate(slotIds, { isBooked: true }, { new: true });
    }
    return updatedSlots;
    
  } catch (error) {
    console.error('Error updating slots when booking:', error);
    throw error; // Re-throw the error if needed for further handling
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
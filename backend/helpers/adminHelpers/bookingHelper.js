const Booking = require('../../model/bookingModel');
const Slot = require('../../model/slotModel'); 
const User = require('../../model/userModel'); 
const Trainer = require('../../model/trainerModel'); 

const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({})
      .populate('userId', 'username')
      .populate('trainerId','username') 
      .exec();

    for (let booking of bookings) {
      const populatedSlots = await Slot.find({ _id: { $in: booking.slots } })
        .exec();
      booking.slots = populatedSlots;

      const slotCount = booking.slots.length;
      if (slotCount > 0) {
        booking.bookingAmount = booking.bookingAmount / slotCount;
      }
    }

    bookings.forEach(booking => {
      booking.bookingDate = new Date(booking.bookingDate).toLocaleDateString('en-GB');
    });


    if (bookings.length) {
      return res.status(200).json({ message: "bookings found", data: bookings });
    } else {
      return res.status(404).json({ message: "bookings not found" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "server error, bookings not found" });
  }
};

module.exports = {
  getAllBookings
};

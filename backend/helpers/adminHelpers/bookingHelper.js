const Booking = require('../../model/bookingModel');
const Slot = require('../../model/slotModel'); // Ensure the Slot model is correctly imported
const User = require('../../model/userModel'); // Ensure the User model is correctly imported
const Trainer = require('../../model/trainerModel'); // Ensure the Trainer model is correctly imported

const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({})
      .populate('userId', 'username')
      .populate('trainerId','username') // Populate userId with username
      .exec();

    // Manually populate slots and trainer
    for (let booking of bookings) {
      const populatedSlots = await Slot.find({ _id: { $in: booking.slots } })
        .exec();
      booking.slots = populatedSlots;

      // Divide the booking amount by the number of slots
      const slotCount = booking.slots.length;
      if (slotCount > 0) {
        booking.bookingAmount = booking.bookingAmount / slotCount;
      }
    }

    // Format booking date
    bookings.forEach(booking => {
      booking.bookingDate = new Date(booking.bookingDate).toLocaleDateString('en-GB');
    });

    console.log(bookings);

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

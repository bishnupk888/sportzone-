const Booking = require('../../model/bookingModel');
const Slot = require('../../model/slotModel'); // Ensure the Slot model is correctly imported

const getAllBookings = async (req, res) => {
  const { id } = req.params;

  try {
    let bookings = await Booking.find({ trainerId: id })
      .populate('userId', 'username email profileImage')
      .exec();

    // Manually populate slots
    for (let booking of bookings) {
      const populatedSlots = await Slot.find({ _id: { $in: booking.slots } }).exec();
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

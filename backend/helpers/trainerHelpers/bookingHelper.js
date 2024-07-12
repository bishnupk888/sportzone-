const Booking = require('../../model/bookingModel');
const Slot = require('../../model/slotModel'); // Ensure the Slot model is correctly imported
const User = require('../../model/userModel');

const getAllBookings = async (req, res) => {
  const { id } = req.params;

  try {
    const bookings = await Booking.find({ trainerId: id })
      .populate('userId', 'username email profileImage')
      .exec();

      console.log("bookings:",bookings);

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

const getBookingDetails = async (req, res) => {
  console.log("get booking details...");
  const { bookingId } = req.params;

  try {
    const booking = await Booking.findById(bookingId);
    console.log(booking.slots);

    if (!booking) {
      return res.status(400).json({ message: 'failed to get booking details' });
    } else {
      const slotDetails = await Promise.all(
        booking.slots.map(async (slotId) => {
          const slot = await Slot.findById(slotId);
          return slot;
        })
      );

      const userDetails = await User.findById(booking.userId)

      console.log("user :",userDetails);

      // Include the slot details in the booking object
      booking.slots = slotDetails;
      booking.userId = userDetails

      res.status(200).json({ message: "successfully fetched booking details", data: booking });
    }

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'server error, failed to get booking details' });
  }
};

module.exports = {
  getAllBookings,
  getBookingDetails
};
